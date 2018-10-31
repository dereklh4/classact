from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (Classroom, UserInClassroom)


#override rest_auth's default registration serializer so can add first and last names, and remove username
class CustomRegistrationSerializer(RegisterSerializer):

	first_name = serializers.CharField(required=False)
	last_name = serializers.CharField(required=False)
	username = None

	def custom_signup(self, request, user):
		user.first_name = self.validated_data.get('first_name', '')
		user.last_name = self.validated_data.get('last_name', '')
		user.save(update_fields=['first_name', 'last_name'])

class CustomLoginSerializer(LoginSerializer):
	username = None

class UserSerializer(serializers.Serializer):
	email = serializers.EmailField()
	first_name = serializers.CharField(max_length=100)
	last_name = serializers.CharField(max_length=100)
	
	class Meta:
		model = User
		fields = ('email','first_name','last_name')

class ClassroomViewSerializer(serializers.ModelSerializer):
	class Meta:
		model = Classroom
		fields = ('title','creation_time','url','enabled')

class ClassroomPostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Classroom
		fields = ('title',)

class ClassroomUpdateSerializer(serializers.ModelSerializer):
	new_title = serializers.CharField(max_length=100)
	class Meta:
		model = Classroom
		fields = ('url','new_title')

class UserInClassroomSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserInClassroom
		fields = ('user','classroom','permission')

class PermissionUpdateSerializer(serializers.ModelSerializer):
	new_permission = serializers.IntegerField()
	url = serializers.CharField(max_length=100)
	user_email = serializers.CharField(max_length=100)

	class Meta:
		model = UserInClassroom
		fields = ('url','user_email','new_permission')

class ClassroomJoinSerializer(serializers.ModelSerializer):
	url = serializers.CharField(max_length=100)

	class Meta:
		model = UserInClassroom
		fields = ('url',)

class ClassroomLeaveSerializer(serializers.ModelSerializer):
	url = serializers.CharField(max_length=100)

	class Meta:
		model = UserInClassroom
		fields = ('url',)

