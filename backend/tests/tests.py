"""
Useful resources:
1. Django testing - https://docs.djangoproject.com/en/2.1/topics/testing/overview/
2. Django testing examples, including coverage - https://realpython.com/testing-in-django-part-1-best-practices-and-examples/
3. Rest framework testing - https://www.django-rest-framework.org/api-guide/testing/

Run all tests with "python manage.py test"
"""

from django.test import TestCase #use this instead of unittest.TestCase if interacting with model
from classact_app.models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from classact_app.consumers import ChatConsumer

PREFIX = "http://localhost:8000/api/"

"""
API Tests
"""

class UserTests(APITestCase):
	def test_registration(self):
		"""
		Ensure we can create a new account object.
		"""
		data = {'email': 'bill_smith@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"Bill",
				"last_name":"Smith"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(User.objects.count(), 1)
		self.assertEqual(User.objects.get().first_name, 'Bill')
		self.assertEqual(User.objects.get().last_name, 'Smith')
		self.assertEqual(User.objects.get().email, 'bill_smith@gmail.com')

class ClassroomTests(APITestCase):
	def setUp(self):
		#create and login user
		data = {'email': 'bill_smith@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"Bill",
				"last_name":"Smith"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

	def test_classroom_creation(self):
		"""
		Ensure we can create a new classroom
		"""
		data = {'title': 'software engineering'}

		response = self.client.post(PREFIX + 'classroom/', data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(Classroom.objects.count(), 1)
		self.assertEqual(Classroom.objects.get().enabled, True)
		self.assertEqual(Classroom.objects.get().title, "software engineering")
		self.assertEqual(UserInClassroom.objects.get().permission, 3) #creator level permission

	def test_classroom_join(self):
		#create classroom as Bill
		data = {'title': 'software engineering'}
		response = self.client.post(PREFIX + 'classroom/', data, format='json')
		classroom_url = Classroom.objects.get().url

		#create/login as a different user
		data = {'email': 'john_williams@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"John",
				"last_name":"Williams"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		#join classroom as different user
		data2 = {"url":classroom_url}
		response = self.client.post(PREFIX + 'classroom/join/', data2, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(UserInClassroom.objects.count(), 2)
		self.assertEqual(UserInClassroom.objects.get(pk=2).user.first_name, "John")
		self.assertEqual(UserInClassroom.objects.get(pk=2).classroom.url, classroom_url)
		self.assertEqual(UserInClassroom.objects.get(pk=2).permission, 1)

"""
Channels tests

"""
class ChatroomTests(APITestCase):
	def setUp(self):
		#create and login user
		data = {'email': 'bill_smith@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"Bill",
				"last_name":"Smith"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')
		token = response.data["key"]

		user = User.objects.get()

		#create classroom
		data = {'title': 'software engineering'}
		response = self.client.post(PREFIX + 'classroom/', data, format='json')
		url = response.data["url"]
		print(Classroom.objects.get().url)

		#custom initialization since not actually going to connect to channel
		scope = {'user':user,'url_route':{'kwargs':{'chatroom_url':url, 'token': token}}}
		self.consumer = ChatConsumer(scope)
		def _fire_event(event,data):
			print("Firing " + str(event))
			self.last_action_data = data
		def _error_message(text):
			print(text)
		self.consumer._fire_event = _fire_event
		self.consumer._error_message = _error_message
		self.consumer.room_name = scope['url_route']['kwargs']['chatroom_url']
		self.consumer.room_group_name = scope['url_route']['kwargs']['chatroom_url']

	def test_post_message(self):
		self.consumer.post_message({"text":"hello world"})
		self.assertEqual(self.last_action_data["text"],"hello world")

		message = Message.objects.get()
		self.assertEqual(message.text,"hello world")

		classroom = Classroom.objects.get()
		self.assertEqual(message.classroom.url,classroom.url)

		user = User.objects.get()
		self.assertEqual(message.user.username,user.username)

	def test_post_response(self):
		self.consumer.post_message({"text":"hello world"})

		message = Message.objects.get()
		self.consumer.post_response({"text":"world response","message_id":message.id})
		
		self.assertEqual(self.last_action_data["text"],"world response")

		response = Response.objects.get()
		self.assertEqual(response.text,"world response")
		self.assertEqual(response.message.text,"hello world")

		user = User.objects.get()
		self.assertEqual(response.user.username,user.username)

	def test_upvote(self):
		self.consumer.post_message({"text":"hello world"})
		message = Message.objects.get()

		self.consumer.upvote_message({"message_id":message.id})

		upvote = UserMessageUpvotes.objects.get()
		user = User.objects.get()
		self.assertEqual(upvote.user.username,user.username)
		self.assertEqual(upvote.message.id,message.id)


