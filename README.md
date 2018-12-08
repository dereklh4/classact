# ClassAct

## Backend

The backend requires python 3.6 or higher to run. You can install the required packages by running:
```
pip install -r requirements.txt 

```
"pip" will have to be changed to "pip3" in the command if you have multiple versions of python on your computer. The requirements.txt file specifies the required packages for this project.

Next, apply the migrations (which actually creates the database)
```
cd backend  
python manage.py migrate
```
Then start the server on localhost 8000
```
python manage.py runserver
``` 

You can view the current api endpoints at localhost:8000/api/schema

## Frontend

The front requires Node.js (https://nodejs.org/en/download/) to run. It uses npm to install all the necessary packages for the project, including React.
```
cd frontend  
npm install
```
You can then run the frontend on localhost:3000
```
npm start
```
