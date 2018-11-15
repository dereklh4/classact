from django.shortcuts import render, HttpResponse
import json
from django.db import models
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from rest_framework.views import APIView
from .models import (Classroom, UserInClassroom)
from datetime import datetime
from classact_app.serializers import *
from rest_framework.response import Response
from rest_framework.exceptions import APIException, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication,TokenAuthentication

class UserList(generics.ListAPIView):
	"""Shows a list of all users"""
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
	permission_classes = (IsAuthenticated,)

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

		print("Creation user: " + str(request.user))
		user = request.user
		user_in_classroom = UserInClassroom(user=user, classroom=classroom, permission=3)
		user_in_classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'New classroom created'
			})

class ClassroomEnableView(generics.CreateAPIView):
	permission_classes = (IsAuthenticated,)

	def get_serializer_class(self):
		return ClassroomEnableSerializer

	def post(self, request, *args, **kwargs):
		"""Enables classroom if user has permission"""
		serializer_class = ClassroomEnableSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		try:
			user = request.user
		except:
			raise APIException("ERROR: User does not exist")

		try:
			user_in_classroom = UserInClassroom.objects.get(classroom=classroom,user=user)
		except:
			raise APIException("ERROR: User does not exist in this classroom")			

		permission = user_in_classroom.permission

		if permission != 3:
			raise APIException("ERROR: User does not have sufficient permissions")

		classroom.enabled = True
		classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'Classroom Enabled Successfully'
			})

class ClassroomDisableView(generics.CreateAPIView):
	permission_classes = (IsAuthenticated,)

	def get_serializer_class(self):
		return ClassroomEnableSerializer

	def post(self, request, *args, **kwargs):
		"""Enables classroom if user has permission"""
		serializer_class = ClassroomEnableSerializer

		url = request.data['url']
		try:
			classroom = Classroom.objects.get(url = url)
		except:
			raise APIException("ERROR: Classroom does not exist")

		try:
			user = request.user
		except:
			raise APIException("ERROR: User does not exist")

		try:
			user_in_classroom = UserInClassroom.objects.get(classroom=classroom,user=user)
		except:
			raise APIException("ERROR: User does not exist in this classroom")			

		permission = user_in_classroom.permission

		if permission != 3:
			raise APIException("ERROR: User does not have sufficient permissions")

		classroom.enabled = False
		classroom.save()

		return Response({
			'status': 'SUCCESS', 'url': classroom.url,
			'message': 'Classroom Disabled Successfully'
			})

class ClassroomUpdateView(generics.CreateAPIView):
	permission_classes = (IsAuthenticated,)

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
	permission_classes = (IsAuthenticated,)

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

		authority_user = request.user
		try:
			authority_permission = UserInClassroom.objects.get(classroom=classroom,user=authority_user).permission
		except:
			raise APIException("ERROR: The user requesting a change is not a member of the classroom")
		
		if authority_permission <= 1:
			raise PermissionDenied("ERROR: This user does not have requisite permissions to change others permissions")

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
	permission_classes = (IsAuthenticated,)

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
	permission_classes = (IsAuthenticated,)

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

class UserClassroomList(generics.ListAPIView):
	serializer_class = ClassroomViewSerializer
	def get_queryset(self):
		user_email = self.kwargs['email'] #User's email is passed in through the url

		try:
			user = User.objects.get(email = user_email)
		except:
			raise APIException("ERROR: User does not exist")

		user_in_classrooms = UserInClassroom.objects.filter(user=user)
		classrooms = []
		for user_in_classroom in user_in_classrooms:
			classrooms.append(user_in_classroom.classroom.url) #Create a list of urls of the classrooms the user is in

		queryset = Classroom.objects.filter(url__in=classrooms)
		return queryset
