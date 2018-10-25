# ClassAct

## Backend

Apply migrations (like actually creating the database)
```
cd backend  
python manage.py migrate
```
Start the server on localhost 8000
```
python manage.py runserver
```

### Requirements
Python 3.5ish or higher  
Django 2.1.2 (pip install django)  
Channels 2.1.3 (pip install channels)  
Django Rest Framework 3.8.2 (pip install djangorestframework)  
Django Rest Auth (pip install django-rest-auth[with_social]) -- the with social allows us to use it for registration, not just login  
Django Rest Swagger (pip install django-rest-swagger) #for displaying api endpoints  
Django cors headers (pip install django-cors-headers) -- allow cross domain requests  
hello

### Notes
You can view the current api endpoints at /api/schema

## Frontend

"npm install" installs packages for the project
```
cd frontend  
npm install
```
Run the frontend
```
npm start
```


### Requirements
Node.js (https://nodejs.org/en/download/)  
React  
React router dom (npm install react-router-dom)
