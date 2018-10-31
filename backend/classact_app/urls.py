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
    url(r'classroom/$', views.ClassroomView.as_view()),
    url(r'classroom/update/$', views.ClassroomUpdateView.as_view()),
    url(r'classroom/permission-update/$', views.PermissionUpdateView.as_view()),
    url(r'classroom/join/$', views.ClassroomJoinView.as_view()),
    url(r'classroom/leave/$', views.ClassroomLeaveView.as_view()),
    url(r'classroom/(?P<url>.*)/$', views.ClassroomView.as_view()),

    #debug api
    url(r'debug/users/', views.UserList.as_view(),name="user-list"),
    url(r'debug/usersinclassroom/$', views.UserInClassroomList.as_view()),
]