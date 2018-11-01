#https://docs.djangoproject.com/en/2.1/topics/testing/overview/
#run all tests with "python manage.py test"

from django.test import TestCase #use this instead of unittest.TestCase if interacting with model
from datetime import datetime
from classact_app.models import Classroom

# Create your tests here.
class ClassroomTestCase(TestCase):
	def setUp(self):
		time = datetime.now()
		classroom1 = Classroom.objects.create(title = "class1",enabled=True)

	def test_default_enabled(self):
		"""Animals that can speak are correctly identified"""
		classroom1 = Classroom.objects.get(title="class1")
		self.assertTrue(classroom1.enabled)