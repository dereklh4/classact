from django.shortcuts import render, HttpResponse
import json
from django.db import models
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from .models import (Classroom, UserInClassroom)
from datetime import datetime
from classact_app.serializers import UserSerializer
from rest_framework.response import Response

# Create your views here.
def hello_world(request):
	#Note: This isn't quite how we will do it since we will use Django REST
	response_data = {"text": "ClassAct hello world!"}
	return HttpResponse(json.dumps(response_data),content_type="application/json")

class UserList(generics.ListAPIView):
	serializer_class = UserSerializer
	#TODO: Eventually won't let just any user see this
	#permission_classes = (IsAdminUser,)

	def get_queryset(self):
		queryset = User.objects.all()

		starts_with = self.request.query_params.get('starts_with', None)
		
		if starts_with:
			queryset = queryset.filter(email__startswith=starts_with)

		return queryset

class ClassroomView(APIView):

	def create(title):
		"""Creates a new Classroom with provided title"""

		time = datetime.now()

		classroom = Classroom.objects.create(title = title, 
			creation_time = time, enabled = True)

		return Response({
			'status': 'SUCCESS', 'uri': classroom.uri,
			'message': 'New classroom created'
			})

	def enabled(status):
		"""Allows user to enable/disable Classroom if they have permission"""

		try:
            classroom = Classroom.objects.get(pk=self.room_group_name)
        except:
            pass
        #     self._error_message("ERROR: Classroom does not exist")

        permission = UserInClassroom.objects.get(pk=self.permission)

        if permission != 3:
        	pass
        #	self._error_message("ERROR: Insufficient Permissions")

        if isinstance(status, int):
        	Classroom.objects.set(pk=self.enabled = status)

        else:
        	pass
        #	self._error_message("ERROR: Incorrect data type, use int or bool")

