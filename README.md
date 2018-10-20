# ClassAct

## Backend
cd backend  
python manage.py migrate #apply migrations (like actually creating database)  
python manage.py runserver #start server on localhost:8000  

### Requirements
Python 3.5ish or higher  
Django 2.1.2 (pip install django)  
Channels 2.1.3 (pip install channels)  
Django Rest Framework 3.8.2 (pip install djangorestframework)  
Django Rest Auth (pip install django-rest-auth[with_social]) #the with social allows us to use it for registration, not just login  
Django Rest Swagger (pip install django-rest-swagger) #for displaying api endpoints

### Notes
You can view the current api endpoints at /api/schema
  
## Frontend
cd frontend  
npm install #need to run in order to install packages for project  
npm start #start react on localhost:3000  

### Requirements
Node.js  
