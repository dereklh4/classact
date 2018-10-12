from django.shortcuts import render, HttpResponse
import json

# Create your views here.
def hello_world(request):
	#Note: This isn't quite how we will do it since we will use Django REST
	response_data = {"text": "ClassAct hello world!"}
	return HttpResponse(json.dumps(response_data),content_type="application/json")