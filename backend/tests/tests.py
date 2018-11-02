"""
Useful resources:
1. Django testing - https://docs.djangoproject.com/en/2.1/topics/testing/overview/
2. Django testing examples, including coverage - https://realpython.com/testing-in-django-part-1-best-practices-and-examples/
3. Rest framework testing - https://www.django-rest-framework.org/api-guide/testing/

Run all tests with "python manage.py test"
"""

from django.test import TestCase #use this instead of unittest.TestCase if interacting with model
from classact_app.models import Classroom
from django.contrib.auth.models import User
from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status

PREFIX = "http://localhost:8000/api/"

#API tests
class UserTests(APITestCase):
	def test_registration(self):
		"""
		Ensure we can create a new account object.
		"""
		data = {'email': 'example_user@gmail.com',
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
		self.assertEqual(User.objects.get().email, 'example_user@gmail.com')

class ClassroomTests(APITestCase):
	def setUp(self):
		#create and login user
		data = {'email': 'example_user@gmail.com',
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