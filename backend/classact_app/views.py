from django.shortcuts import render, HttpResponse
import json
from django.db import models
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from rest_framework.views import APIView
from .models import (Classroom, UserInClassroom, ClassroomUpdate, PermissionUpdate)
from datetime import datetime
from classact_app.serializers import (UserSerializer, ClassroomViewSerializer,ClassroomPostSerializer,ClassroomUpdateSerializer,UserInClassroomSerializer,PermissionUpdateSerializer)
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

class ClassroomView(generics.ListAPIView):

	def get_serializer_class(self):
		if self.request.method == "POST":
			return ClassroomPostSerializer
		else:
			return ClassroomViewSerializer

	def get_queryset(self):
		data_dict = self.request.data
		url = self.kwargs['url'] if 'url' in self.kwargs else None
		print(url)
		if url:
			return Classroom.objects.filter(url=url)
		else:
			return Classroom.objects.all()

	def post(self, request, *args, **kwargs):
		"""Creates a new Classroom with provided title"""
		serializer_class = ClassroomPostSerializer
		time = datetime.now()

		title = request.data['title']

		classroom = Classroom.objects.create(title = title, 
			creation_time = time, enabled = True)

		user = request.user
		user_in_classroom = UserInClassroom(user=user, classroom=classroom, permission=3)
		user_in_classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'New classroom created'
			})

	def enable(room):
		"""Enables classroom if user has permission"""

		try:
			classroom = Classroom.objects.get(title = room)
		except:
			pass
		#     self._error_message("ERROR: Classroom does not exist")

		permission = UserInClassroom.objects.get(user = self)

		if permission.permission != 3:
			pass
		#	self._error_message("ERROR: Insufficient Permissions")

		classroom.enabled = True
		classroom.save()

	def disable(room):
		"""Disables classroom if user has permission"""

		try:
			classroom = Classroom.objects.get(title = room)
		except:
			pass
		#     self._error_message("ERROR: Classroom does not exist")

		permission = UserInClassroom.objects.get(user = self)

		if permission.permission != 3:
			pass
		#	self._error_message("ERROR: Insufficient Permissions")

		classroom.enabled = False
		classroom.save()

class ClassroomUpdateView(generics.ListAPIView):
	def get_serializer_class(self):
		return ClassroomUpdateSerializer

	def get_queryset(self):
		data_dict = self.request.data
		return ClassroomUpdate.objects.all()

	def post(self, request, *args, **kwargs):
		"""Updates Classroom title"""
		serializer_class = ClassroomUpdateSerializer

		room = request.data['classroom']
		try:
			classroom = Classroom.objects.get(title = room)
		except:
			pass
		#	self._error_message("ERROR: Classroom does not exist")

		new_title = request.data['new_title']

		#user = request.user
		#userinclass = UserInClassroom.objects.get(user=user,classroom=classroom)
		#if userinclass.permission != 3:
			#self._error_message("ERROR: Insufficient Permissions")

		classroom.title = new_title
		classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'Classroom Updated Successfully'
			})

class UserInClassroomList(generics.ListAPIView):
	"""Displays a list of the UserInClassroom relations"""
	serializer_class = UserInClassroomSerializer

	def get_queryset(self):
		queryset = UserInClassroom.objects.all()
		return queryset

class PermissionUpdateView(generics.ListAPIView):
	def get_serializer_class(self):
		return PermissionUpdateSerializer

	def get_queryset(self):
		data_dict = self.request.data
		return PermissionUpdate.objects.all()

	def post(self, request, *args, **kwargs):
		"""Changes permission of given user in given class"""
		serializer_class = PermissionUpdateSerializer

		room = request.data['classroom']
		try:
			classroom = Classroom.objects.get(title = room)
		except:
			pass
		#	self._error_message("ERROR: Classroom does not exist")

		user_name = request.data['user']
		try:
			user = User.objects.get(first_name = user_name)#User must input just first name; Will change
		except:
			pass
		#	self._error_message("ERROR: User does not exist")

		new_permission = request.data['new_permission']

		user_in_classroom = UserInClassroom.objects.get(classroom=classroom,user=user)

		user_in_classroom.permission = new_permission

		user_in_classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'Permission Updated Successfully'
			})