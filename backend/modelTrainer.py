
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Input, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
import joblib


# Load and clean data
df = pd.read_csv('trainingdatanew.csv')
percentage_columns = ['Q1 Quota Split', 'Q2 Quota Split', 'Q3 Quota Split', 'Q4 Quota Split', 'COMMISSION SPLIT (TCV)', 'COMMISSION SPLIT(ACV)']
for col in percentage_columns:
    df[col] = df[col].str.rstrip('%').astype(float) / 100
df['REVENUE SIZE'] = df['REVENUE SIZE'].str.replace(',', '').astype(float)

# Define features and targets
X = df[['Industry', 'REVENUE SIZE']]
y = df[percentage_columns]

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['REVENUE SIZE']),
        ('cat', OneHotEncoder(), ['Industry'])
    ])

# Model building function with adjustments
def get_compiled_model(input_dim):
    input_layer = Input(shape=(input_dim,))
    x = Dense(128, activation='relu', kernel_regularizer=l2(0.01))(input_layer)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    x = Dense(64, activation='relu', kernel_regularizer=l2(0.01))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    quota_outputs = Dense(4, activation='linear', name='quota')(x)  # Q1-Q4 splits
    tcv_output = Dense(1, activation='linear', name='tcv')(x)  # TCV
    acv_output = Dense(1, activation='linear', name='acv')(x)  # ACV

    model = Model(inputs=input_layer, outputs=[quota_outputs, tcv_output, acv_output])
    model.compile(optimizer=Adam(learning_rate=0.001),
                  loss='mse',
                  metrics={
                      'quota': ['mae'],
                      'tcv': ['mae'],
                      'acv': ['mae']
                  })
    return model


# Prepare data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create the pipeline
preprocessor.fit(X_train)
model = get_compiled_model(preprocessor.transform(X_train).shape[1])

# Setup early stopping
early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

# Train the model directly
model.fit(preprocessor.transform(X_train), 
          [y_train.iloc[:, :4], y_train.iloc[:, 4], y_train.iloc[:, 5]], 
          epochs=100, 
          batch_size=32, 
          validation_split=0.2, 
          callbacks=[early_stopping])

# After training your model, save it as an HDF5 file
model.save('my_model.keras')

# Save the preprocessor
joblib.dump(preprocessor, 'preprocessor.joblib')