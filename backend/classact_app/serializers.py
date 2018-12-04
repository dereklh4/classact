from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


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

class UserInClassroomSerializer(serializers.Serializer):
	user = UserSerializer()
	classroom = ClassroomViewSerializer()
	permission = serializers.IntegerField()
	class Meta:
		model = UserInClassroom
		fields = ('user','classroom','permission')

class PermissionUpdateSerializer(serializers.ModelSerializer):
	new_permission = serializers.IntegerField()
	url = serializers.CharField(max_length=100)
	user_email = serializers.EmailField()

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

class ClassroomEnableSerializer(serializers.ModelSerializer):
	class Meta:
		model = Classroom
		fields = ('url',)

class UserInClassroomViewSerializer(serializers.ModelSerializer):
	permission = serializers.IntegerField()
	classroom = ClassroomViewSerializer
	user = serializers.EmailField()
	student_count = serializers.SerializerMethodField()

	def get_student_count(self,validated_data):
		return len(UserInClassroom.objects.filter(classroom=validated_data.classroom))

	class Meta:
		model = UserInClassroom
		fields = ('user','classroom','permission','student_count')
		depth = 2

class UserImageSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(source="user.email",read_only=True)

	class Meta:
		model = UserImage
		fields = ('id','user','email','image')

