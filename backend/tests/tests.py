"""
Useful resources:
1. Django testing - https://docs.djangoproject.com/en/2.1/topics/testing/overview/
2. Django testing examples, including coverage - https://realpython.com/testing-in-django-part-1-best-practices-and-examples/
3. Rest framework testing - https://www.django-rest-framework.org/api-guide/testing/

Run all tests with "python manage.py test"

"coverage html" to create html report
"""

from django.test import TestCase #use this instead of unittest.TestCase if interacting with model
from classact_app.models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from classact_app.consumers import ChatConsumer
import json

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

	def test_user_list(self):
		data = {'email': 'bill_smith@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"Bill",
				"last_name":"Smith"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		data = {'email': 'john_hansen@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"John",
				"last_name":"Hansen"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		response = self.client.get(PREFIX + 'debug/users/', format='json')

		self.assertEqual(User.objects.count(),2)
		self.assertEqual(response.data[0]["email"],"bill_smith@gmail.com")
		self.assertEqual(response.data[1]["email"],"john_hansen@gmail.com")

	def test_login(self):
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
		
		data = {'email': 'john_hansen@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"John",
				"last_name":"Hansen"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		data = {
			'email': 'bill_smith@gmail.com',
			'password':'f!re8all18'
		}
		response = self.client.post(PREFIX + 'auth/login/',data,format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["key"],Token.objects.get(user_id=1).key)


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

		#create classroom as that user
		data = {'title': 'software engineering'}
		response = self.client.post(PREFIX + 'classroom/', data, format='json')
		self.url = response.data["url"]

	def test_classroom_creation(self):
		"""
		Ensure we can create a new classroom
		"""

		data = {'title': 'hello classroom'}
		response = self.client.post(PREFIX + 'classroom/', data, format='json')
		url = response.data["url"]

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(Classroom.objects.count(), 2)
		self.assertEqual(Classroom.objects.get(url=url).enabled, True)
		self.assertEqual(Classroom.objects.get(url=url).title, "hello classroom")
		self.assertEqual(UserInClassroom.objects.get(classroom=Classroom.objects.get(url=self.url)).permission, 3) #creator level permission

	def test_classroom_update(self):

		data = {
			"url": self.url,
			"new_title": "new classroom title"
		}
		response = self.client.post(PREFIX + 'classroom/update/', data, format='json')

		self.assertEqual(Classroom.objects.get().title,"new classroom title")

	def test_classroom_enable_disable(self):
		data = {
			"url":self.url
		}
		response = self.client.post(PREFIX + "classroom/disable/",data,format="json")
		self.assertEqual(Classroom.objects.get().enabled,False)

		response = self.client.post(PREFIX + "classroom/enable/",data,format="json")
		self.assertEqual(Classroom.objects.get().enabled,True)

	def test_permissions(self):
		#create a second user and join classroom
		data = {'email': 'john_hansen@gmail.com',
			'password1':'f!re8all18',
			'password2':'f!re8all18',
			"first_name":"John",
			"last_name":"Hansen"
		}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		data = {"url":self.url}
		response = self.client.post(PREFIX + 'classroom/join/', data, format='json')

		#try to update own permission as just a member
		data = {
			"url":self.url,
			"user_email":"john_hansen@gmail.com",
			"new_permission":3
		}
		response = self.client.post(PREFIX + "classroom/permission-update/",data,format="json")
		self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

		#try to update john's permission as classroom creator Bill
		data = {
			'email': 'bill_smith@gmail.com',
			'password':'f!re8all18'
		}
		response = self.client.post(PREFIX + 'auth/login/',data,format='json')

		data = {
			"url":self.url,
			"user_email":"john_hansen@gmail.com",
			"new_permission":2
		}
		response = self.client.post(PREFIX + "classroom/permission-update/",data,format="json")
		self.assertEqual(response.status_code,status.HTTP_200_OK)
		self.assertEqual(UserInClassroom.objects.get(user=User.objects.get(email="john_hansen@gmail.com")).permission,2)

	def test_classroom_join_leave(self):
		#create/login as a different user
		data = {'email': 'john_williams@gmail.com',
				'password1':'f!re8all18',
				'password2':'f!re8all18',
				"first_name":"John",
				"last_name":"Williams"
				}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		#join first classroom as different user
		data2 = {"url":self.url}
		response = self.client.post(PREFIX + 'classroom/join/', data2, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(UserInClassroom.objects.count(), 2)
		self.assertEqual(UserInClassroom.objects.get(pk=2).user.first_name, "John")
		self.assertEqual(UserInClassroom.objects.get(pk=2).classroom.url, self.url)
		self.assertEqual(UserInClassroom.objects.get(pk=2).permission, 1)

		#make sure shows up in list of classrooms for that user
		response = self.client.get(PREFIX + "api/user/" + data["email"] + "/")
		self.assertEqual(response.data[0]["classroom"]["url"],self.url)
		self.assertEqual(len(response.data),1)

		#leave
		response = self.client.post(PREFIX + 'classroom/leave/', data2, format='json')		

		self.assertEqual(response.status_code,status.HTTP_200_OK)
		self.assertEqual(UserInClassroom.objects.count(), 1)
		try:
			UserInClassroom.objects.get(pk=2)
			self.fail("User should no longer exist in classroom")
		except:
			pass

		#make sure no longer in user's class list
		response = self.client.get(PREFIX + "api/user/" + data["email"] + "/")
		self.assertEqual(len(response.data),0)


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
		self.url = url
		print(Classroom.objects.get().url)

		#custom initialization since not actually going to connect to channel
		scope = {'user':user,'url_route':{'kwargs':{'chatroom_url':url, 'token': token}}}
		self.consumer = ChatConsumer(scope)
		def _fire_event(event,data):
			print("Firing " + str(event))
			self.last_action_data = data
		def _error_message(text):
			print("ERROR: " + str(text))
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

	def test_message_delete(self):
		self.consumer.post_message({"text":"hello world"})
		message = Message.objects.get()
		self.consumer.post_message({"text":"other message"})

		self.consumer.delete_message({"message_id":message.id})

		messages = Message.objects.all()
		self.assertEqual(len(messages),1)
		self.assertEqual(messages[0].text,"other message")

	def test_response_delete(self):
		self.consumer.post_message({"text":"hello world"})

		message = Message.objects.get()
		self.consumer.post_response({"text":"world response","message_id":message.id})
		response = Response.objects.get()
		self.consumer.post_response({"text":"another","message_id":message.id})

		self.consumer.delete_response({"message_id":message.id, "response_id":response.id})

		responses = Response.objects.all()
		self.assertEqual(len(responses),1)
		self.assertEqual(responses[0].text,"another")

	def test_edit_message(self):
		self.consumer.post_message({"text":"hello world"})
		message = Message.objects.get()
		self.assertEqual(message.text,"hello world")

		self.consumer.edit_message({"message_id":message.id,"text":"new text"})
		message = Message.objects.get()
		self.assertEqual(message.text,"new text")

		data = {'email': 'john_hansen@gmail.com',
			'password1':'f!re8all18',
			'password2':'f!re8all18',
			"first_name":"John",
			"last_name":"Hansen"
		}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		data = {"url":self.url}
		response = self.client.post(PREFIX + 'classroom/join/', data, format='json')

		try:
			self.consumer.edit_message({'message_id': message.id, 'text': "Other user edit test"})
			self.fail("User should not have access to other users messages")
		except:
			pass

	def test_edit_response(self):
		self.consumer.post_message({"text":"hello world"})

		message = Message.objects.get()
		self.consumer.post_response({"text":"world response","message_id":message.id})
		response = Response.objects.get()
		self.consumer.edit_response({"text":"new response","message_id":message.id,"response_id":response.id})

		response = Response.objects.get()
		self.assertEqual(response.text,"new response")

	def test_anonymous(self):
		self.consumer.post_message({'text': "Not anonymous"})
		message = Message.objects.get()

		self.assertEqual(message.anonymous, False)

		self.consumer.post_response({"text":"Also not anonymous","message_id":message.id})
		response = Response.objects.get()

		self.assertEqual(response.anonymous, False)

		self.consumer.edit_message({'message_id': message.id, 'text': "Anonymous now", 'anonymous': True})
		message = Message.objects.get()
		self.assertEqual(message.anonymous, True)

		self.consumer.edit_response({"text":"Anonymous True","message_id":message.id,"response_id":response.id, 'anonymous': True})
		response = Response.objects.get()
		self.assertEqual(response.anonymous, True)

	def test_resolve_message(self):
		self.consumer.post_message({'text': "Message to be resolved"})
		message = Message.objects.get()
		self.assertEqual(message.resolved, False)

		self.consumer.resolve_message({'message_id': message.id})
		message = Message.objects.get()
		self.assertEqual(message.resolved, True)

		data = {'email': 'john_hansen@gmail.com',
			'password1':'f!re8all18',
			'password2':'f!re8all18',
			"first_name":"John",
			"last_name":"Hansen"
		}
		response = self.client.post(PREFIX + 'auth/registration/', data, format='json')

		data = {"url":self.url}
		response = self.client.post(PREFIX + 'classroom/join/', data, format='json')

		try:
			self.consumer.resolve_message({'message_id': message.id})
			self.fail("User should not have sufficient permission")
		except:
			pass