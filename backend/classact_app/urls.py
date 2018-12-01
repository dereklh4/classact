from django.urls import path, include
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view

from . import views

schema_view = get_swagger_view(title="ClassAct API")

urlpatterns = [
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
    url(r'classroom/enable/$', views.ClassroomEnableView.as_view()),
    url(r'classroom/disable/$', views.ClassroomDisableView.as_view()),
	url(r'classroom/users/$', views.UsersInClassroomList.as_view()),
    url(r'classroom/(?P<url>.*)/$', views.ClassroomView.as_view()),

    url(r'user/image/$', views.UserImageListView.as_view()), #for posting an image, and getting list of user images
    url(r'user/image/(?P<filepath>.*)$', views.UserImageView.as_view()), #for downloading the image


    url(r'user/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$', views.UserClassroomList.as_view()),#Example: user/eric@gmail.com/ would
                                                                                                         #display the classrooms for a user with
                                                                                                         #the email 'eric@gmail.com'
    #debug api
    url(r'debug/users/', views.UserList.as_view(),name="user-list"),
    url(r'debug/usersinclassroom/$', views.UserInClassroomList.as_view()),
]