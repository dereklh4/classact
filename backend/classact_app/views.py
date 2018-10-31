from django.shortcuts import render, HttpResponse
import json
from django.db import models
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from rest_framework.views import APIView
from .models import (Classroom, UserInClassroom)
from datetime import datetime
from classact_app.serializers import (UserSerializer, ClassroomViewSerializer,ClassroomPostSerializer,ClassroomUpdateSerializer,UserInClassroomSerializer,PermissionUpdateSerializer,ClassroomJoinSerializer,ClassroomLeaveSerializer)
from rest_framework.response import Response
from rest_framework.exceptions import APIException

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
			raise APIException("ERROR: Classroom does not exist")

		permission = UserInClassroom.objects.get(user = self)

		if permission.permission != 3:
			raise APIException("ERROR: Insufficient permissions")

		classroom.enabled = True
		classroom.save()

	def disable(room):
		"""Disables classroom if user has permission"""

		try:
			classroom = Classroom.objects.get(title = room)
		except:
			raise APIException("ERROR: Classroom does not exist")

		permission = UserInClassroom.objects.get(user = self)

		if permission.permission != 3:
			raise APIException("ERROR: Insufficient permissions")

		classroom.enabled = False
		classroom.save()

class ClassroomUpdateView(generics.CreateAPIView):
	def get_serializer_class(self):
		return ClassroomUpdateSerializer

	def post(self, request, *args, **kwargs):
		"""Updates Classroom title"""
		serializer_class = ClassroomUpdateSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		new_title = request.data['new_title']

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

class PermissionUpdateView(generics.CreateAPIView):
	def get_serializer_class(self):
		return PermissionUpdateSerializer

	def post(self, request, *args, **kwargs):
		"""Changes permission of given user in given class"""
		serializer_class = PermissionUpdateSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		email = request.data['user_email']
		try:
			user = User.objects.get(email = email)
		except:
			raise APIException("ERROR: User does not exist")

		new_permission = request.data['new_permission']

		try:
			user_in_classroom = UserInClassroom.objects.get(classroom=classroom,user=user)
		except:
			raise APIException("ERROR: User does not exist in this classroom")			

		user_in_classroom.permission = new_permission

		user_in_classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'Permission Updated Successfully'
			})

class ClassroomJoinView(generics.CreateAPIView):
	def get_serializer_class(self):
		return ClassroomJoinSerializer

	def post(self, request, *args, **kwargs):
		"""Allows user to join an already existing classroom"""
		serializer_class = ClassroomJoinSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		user = request.user
		user_in_classroom = UserInClassroom(user=user, classroom=classroom, permission=1)
		user_in_classroom.save()
		
		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'User Joined Classroom Successfully'
			})

class ClassroomLeaveView(generics.CreateAPIView):
	def get_serializer_class(self):
		return ClassroomLeaveSerializer

	def post(self, request, *args, **kwargs):
		"""Allows user to leave a classroom they have previously joined"""
		serializer_class = ClassroomLeaveSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		user = request.user
		try:
			user_in_classroom = UserInClassroom.objects.get(classroom=classroom,user=user)
		except:
			raise APIException("ERROR: User does not exist in this classroom")
			
		user_in_classroom.delete()
		
		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'User Left Classroom Successfully'
			})