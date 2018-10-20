from django.urls import path, include
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view

from . import views

schema_view = get_swagger_view(title="ClassAct API")

urlpatterns = [
	#hello world
    path('', views.hello_world, name='hello_world'),

    #rest-auth api for login/logout/registration (see https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)
    path(r'auth/', include('rest_auth.urls')),
    path(r'auth/registration/',include('rest_auth.registration.urls')),

    #swagger - show api
    path(r'schema/',schema_view),

    #api
    url(r'users/', views.UserList.as_view(),name="user-list"),
]