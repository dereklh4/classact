from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Classroom(models.Model):
    title = models.CharField(max_length=100)
    creation_time = models.DateField(auto_now=True)
    enabled = models.BooleanField()

class UserInClassroom(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
	permission = models.IntegerField() #0 for blocked, 1 for normal, 2 for moderator, 3 for creator

class Message(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	#classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE) #Add back in later once we have classroom stuff setup
	text = models.CharField(max_length=1000)
	creation_time = models.DateTimeField(auto_now=True)
