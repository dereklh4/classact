from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view

from . import views

schema_view = get_swagger_view(title="ClassAct API")

urlpatterns = [
    path('', views.hello_world, name='hello_world'),
    path(r'auth/', include('rest_auth.urls')), #default rest-auth api for login/logout (see https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)
    path(r'auth/registration/',include('rest_auth.registration.urls')),
    path(r'schema',schema_view) #show schema view
]