# EndlessMomentsLLC-AI-ML-Project

<!-- To run the **homepage.html**, download VS Code and open the file in the editor. Make sure to **download** this plugin so you can open the website in the browser:

[https://youtu.be/VqZURkN90Ik?si=3Mb8GZco81ks0_8A](url)

You can also open the file by **double clicking** on the html file from your downloads (on Windows at least).  -->

**Procedure on how to run the code**

**Repeated Runs**
1. cd into backend
    cd backend

2. Run the following commands:
    a. MacOS
        i. source venv/bin/activate
    b. Windows
        i. .\venv\Scripts\activate

3. Run the following (just run this for repeated compiles/runs in the same session):
    cd ../frontend; npm run build; cd ../backend; flask run

**Initial Setup**
1. cd into backend
    cd backend

2. Run the following commands (this might take a few minutes, gets venv set up and installs required libs):
    a. MacOS
        i. python3 -m venv venv
        ii. source venv/bin/activate
        iii. pip3 install -r requirements.txt
    b. Windows
        i. python -m venv venv
        ii. .\venv\Scripts\activate
        iii. pip install -r requirements.txt

3. Run the following:
    i. cd ../frontend
    ii. npm install

4. After that's done, next run the following:
    npm run build; cd ../backend; flask run