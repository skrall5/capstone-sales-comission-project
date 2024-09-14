import pandas as pd
from tensorflow.keras.models import load_model
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib.units import inch
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from pymongo import MongoClient
from bson import ObjectId
from json import JSONEncoder


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(CustomJSONEncoder, self).default(obj)
    
app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://kanderpyfish:Boston2011%23@logininfo.s1rjc4g.mongodb.net/?retryWrites=true&w=majority&appName=LoginInfo&ssl=true&ssl_cert_reqs=CERT_REQUIRED')  # Change the connection string as per your MongoDB setup
db = client['LoginInfo']  # Replace 'your_database' with your database name
collection = db['UserInfo']  # Replace 'your_collection' with your collection name

# Load the model previously saved in .keras format
loaded_model = load_model('my_model.keras')

# Load the preprocessor
preprocessor = joblib.load('preprocessor.joblib')

# Prediction function
def predict_values(industry, revenue_size, model, preprocessor):
    # Create a DataFrame with the input values
    user_input = pd.DataFrame({'Industry': [industry], 'REVENUE SIZE': [float(revenue_size.replace(',', ''))]})
    # Transform the input data using the preprocessor
    processed_input = preprocessor.transform(user_input)
    # Get the prediction from the model
    prediction = model.predict(processed_input)

    # Extract the quarterly splits and ensure they sum to 100%
    q1, q2, q3 = np.floor(prediction[0][0][:3] * 100)  # Multiply by 100 to convert to percentages and round down
    q4 = 100 - (q1 + q2 + q3)  # Calculate Q4 so that the sum is 100%

    # Check TCV and ACV, change negative values to 0
    tcv = max(0, prediction[1][0][0])  # Use max to ensure negative values are set to 0
    acv = max(0, prediction[2][0][0])  # Use max to ensure negative values are set to 0
    q1, q2, q3, q4 = map(float, [q1, q2, q3, q4])
    tcv = float(tcv)
    acv = float(acv)
    return {
        'Quarterly Splits': [q1, q2, q3, q4],  # Return all quarters as a list
        'TCV': tcv,
        'ACV': acv
}

@app.route('/predict', methods=['POST'])  # Ensure that this is POST, not GET.
def get_data():
    data = request.json  # Get data from POST request body.
    
    form_type = data.get('form_type')
    
    if form_type == 'adminFormData':
        company = data.get('company')
        industry_input = data.get('industry')
        revenue_input = data.get('revenueSize')
        snality = data.get('seasonalityChoice')
        fYs = data.get('fiscalYearStart')
        fYe = data.get('fiscalYearEnd')
        pt = data.get('productType')
        rt = data.get('rampTime')
        qs = data.get('quarterlySplits')
        accelerator_1 = data.get('a1')
        accelerator_2 = data.get('a2')
        accelerator_3 = data.get('a3') 
        accelerator_4 = data.get('a4')
        result = predict_values(industry_input, revenue_input, loaded_model, preprocessor)
        print("This is result: ", result)
        # Merge data and result into one document
        result_converted = {k: (float(v) if isinstance(v, np.floating) else v) for k, v in result.items()}
        document_to_insert = {**data, 'result': result_converted}
        collection.insert_one(document_to_insert)
        return jsonify(result)
        # Call the prediction function with user inputs
    elif form_type == 'salesRepFormData':
        employeeName = data.get('employeeName')
        company = data.get('company')
        title = data.get('title')
        managersName = data.get('managersName')
        currentJobTitle = data.get('currentJobTitle')
        startDate = data.get('startDate')
        baseSalary = data.get('baseSalary')
        comRate = data.get('comRate')
        totalQuota = data.get('totalQuota')
        productType1 = data.get('productType1')
        productType2 = data.get('productType2')
        productType3 = data.get('productType3')
        hardwareQuota = data.get('hardwareQuota')
        softwareQuota = data.get('softwareQuota')
        servicesQuota = data.get('servicesQuota')
        print(data)

        collection.insert_one(data)
        return data
    else:
        return jsonify({'error': 'Invalid form type'}), 400

if __name__ == "__main__":
    app.run(debug=True)