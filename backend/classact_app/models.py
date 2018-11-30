from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
import os

# Create your models here.
def _generate_url():
	"""Generates a unique uri for the chat session."""
	return str(uuid4()).replace('-', '')[:15]

def get_image_path(instance, filename):
    return "image_files/" + os.path.join(filename)

class Classroom(models.Model):
	title = models.CharField(max_length=100)
	creation_time = models.DateField(auto_now=True)
	enabled = models.BooleanField()
	url = models.URLField(default=_generate_url)

class UserInClassroom(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
	permission = models.IntegerField() #0 for blocked, 1 for normal, 2 for moderator, 3 for creator

class Message(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, default=None)
	text = models.CharField(max_length=1000)
	creation_time = models.DateTimeField(auto_now=True)
	anonymous = models.BooleanField(default=False)
	resolved = models.BooleanField(default=False)

class UserMessageUpvotes(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	message = models.ForeignKey(Message,on_delete=models.CASCADE)

class Response(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	message = models.ForeignKey(Message,on_delete=models.CASCADE)
	text = models.CharField(max_length=1000)
	creation_time = models.DateTimeField(auto_now=True)
	anonymous = models.BooleanField(default=False)

class UserResponseUpvotes(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	response = models.ForeignKey(Response,on_delete=models.CASCADE)

class UserPinMessage(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	message = models.ForeignKey(Message,on_delete=models.CASCADE)
	classroom = models.ForeignKey(Classroom,on_delete=models.CASCADE)

class EndorseResponse(models.Model):
	response = models.ForeignKey(Response,on_delete=models.CASCADE)
	classroom = models.ForeignKey(Classroom,on_delete=models.CASCADE)

class UserSaveQuestion(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	message = models.ForeignKey(Message,on_delete=models.CASCADE)

class UserImage(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	image = models.ImageField(upload_to=get_image_path,blank=True,null=True)

