from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
import channels
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import *
from django.core import serializers

class ChatConsumer(WebsocketConsumer):

	def connect(self):
		#set chatroom name
		print(self.scope['url_route'])
		self.room_name = self.scope['url_route']['kwargs']['chatroom_url']
		self.room_group_name = self.room_name
		classroom_url = self.room_name

		#check token
		try:
			token = Token.objects.get(key=self.scope['url_route']['kwargs']['token'])
		except:
			print("ERROR: Not a valid token for websocket connection")
			return

		self.scope["user"] = token.user

		self._validate_user()

		#join room group
		async_to_sync(self.channel_layer.group_add)(
			self.room_group_name,
			self.channel_name
		)

		#accept connection
		self.accept()
		print("connected a client on websocket")

	def disconnect(self, close_code):
		# leave group room
		async_to_sync(self.channel_layer.group_discard)(
			self.room_group_name,
			self.channel_name
		)
		print("disconnected a client from websocket")

	def receive(self, text_data):
		data = json.loads(text_data)
		self.commands[data['command']](self, data)

	def _fire_event(self, event, message):
		# Send message to room group
		print("broadcasting event "+ str(event) + " with message:" + str(message))
		async_to_sync(self.channel_layer.group_send)(
			self.room_group_name,
			{
				'type': event,
				'content': message
			}
		)

	def _error_message(self,error_text):
		print("ERROR: " + error_text)
		async_to_sync(self.channel_layer.group_send)(
			self.room_group_name,
			{
				'type': 'error_message',
				'content': error_text
			}
		)
		raise Exception(error_text)

	"""
	Checks that user exists, classroom exists, and that user is part of the classroom
	Returns the validated user model object, and classroom model object
	"""
	def _validate_user(self):
		username = self.scope["user"]
		if username == None:
			self._error_message("Empty username")
			raise

		try:
			user = User.objects.get(username=username)
		except:
			self._error_message("Not a valid user: " + str(username))
			raise

		try:
			classroom = Classroom.objects.get(url=self.room_group_name)
		except:
			self._error_message("Classroom does not exist")
			raise

		try:
			user_in_classroom = UserInClassroom.objects.get(user = self.scope["user"], classroom=classroom)
		except:
			self._error_message("User is not a part of this classroom")
			raise

		return user, classroom

	def message_to_json(self, message):
		message_upvotes = UserMessageUpvotes.objects.filter(message=message)
		upvoted_by_user = len(message_upvotes.filter(user=self.scope["user"])) >= 1
		responses = Response.objects.filter(message=message)
		pinned = len(UserPinMessage.objects.filter(message=message)) >= 1
		saved_by_user = len(UserSaveQuestion.objects.filter(user=self.scope["user"],message=message)) >= 1
		
		user_image = ""
		try:
			user_image = UserImage.objects.get(user=message.user).image.url
		except:
			pass

		return {
			'id': message.id,
			'user': message.user.username,
			'user_image':user_image,
			'text': message.text,
			'hour': message.creation_time.hour,
			'minute':message.creation_time.minute,
			'second':message.creation_time.second,
			'day':message.creation_time.day,
			'month':message.creation_time.month,
			'year':message.creation_time.year,
			'upvotes':len(message_upvotes),
			'upvoted_by_user':upvoted_by_user,
			'anonymous':message.anonymous,
			'saved_by_user':saved_by_user,
			'pinned':pinned,
			'responses': list(map(lambda x: self.response_to_json(x), responses))
		}

	def response_to_json(self, response):
		response_upvotes = UserResponseUpvotes.objects.filter(response=response)
		upvoted_by_user = len(response_upvotes.filter(user=self.scope["user"])) >= 1
		endorsed = len(UserEndorseResponse.objects.filter(response=response)) >= 1
		
		user_image = ""
		try:
			user_image = UserImage.objects.get(user=response.user).image.url
		except:
			pass

		return {
			'message_id': response.message.id,
			'response_id': response.id,
			'user': response.user.username,
			'user_image':user_image,
			'text': response.text,
			'hour': response.creation_time.hour,
			'minute':response.creation_time.minute,
			'second':response.creation_time.second,
			'day':response.creation_time.day,
			'month':response.creation_time.month,
			'year':response.creation_time.year,
			'upvotes':len(response_upvotes),
			'upvoted_by_user':upvoted_by_user,
			'anonymous':response.anonymous,
			'endorsed':endorsed,
		}

	def init_chat(self,data):
		user, classroom = self._validate_user()

		count = data["message_count"]
		messages = Message.objects.filter(classroom=classroom).order_by('creation_time')[:count]

		messages_json = list(map(lambda x: self.message_to_json(x), messages))

		self.send(text_data=json.dumps({"type":"init_chat","content":messages_json}))

	## COMMAND METHODS

	def post_message(self, data):
		user, classroom = self._validate_user()

		text = data['text']

		#anonymous = data['anonymous']

		message = Message.objects.create(user=user, text=text, classroom=classroom, anonymous=False)
		print(str(message.id))

		self._fire_event("new_message",self.message_to_json(message))

	def edit_message(self, data):
		user, classroom = self._validate_user()

		text = data['text']

		#anonymous = data['anonymous']

		message_id = data['message_id']

		try:
			message = Message.objects.get(user=user, id=message_id)
		except:
			self._error_message("Message does not exist")

		message.text = text
		message.anonymous = False
		message.save()

		self._fire_event("edited_message",
							{
								"message_id": message_id,
								"text": text,
							}
						)

	def delete_message(self, data):
		user, classroom = self._validate_user()

		message_id = data['message_id']

		try:
			message = Message.objects.get(user=user, id=message_id)
		except:
			self._error_message("Message does not exist")

		message.delete()

		self._fire_event("deleted_message", {"message_id":message_id})

	def upvote_message(self,data):
		user, classroom = self._validate_user()

		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		if len(UserMessageUpvotes.objects.filter(user=user,message=message)) == 0:
			UserMessageUpvotes.objects.create(user=user,message=message)
		else:
			self._error_message("User " + user.username + "already upvoted that message")

		upvotes = len(UserMessageUpvotes.objects.filter(message=message))
		self._fire_event("upvoted_message",
							{
								"message_id":message_id,
								"upvotes":upvotes
							}
						)

	def un_upvote_message(self,data):
		user, classroom = self._validate_user()

		message_id = data["message_id"]

		print(message_id)

		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		if len(UserMessageUpvotes.objects.filter(user=user,message=message)) > 0:
			UserMessageUpvotes.objects.filter(user=user, message=message).delete()

		upvotes = len(UserMessageUpvotes.objects.filter(message=message))
		self._fire_event("un_upvoted_message",
							{
								"message_id":message_id,
								"upvotes":upvotes
							}
						)

	def post_response(self, data):
		user, classroom = self._validate_user()

		text = data['text']

		#anonymous = data['anonymous']

		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		response = Response.objects.create(user=user, message=message, text=text, anonymous=False)

		self._fire_event("new_response",self.response_to_json(response))

	def edit_response(self, data):
		user, classroom = self._validate_user()

		text = data['text']

		#anonymous = data['anonymous']

		message_id = data["message_id"]

		response_id = data["response_id"]

		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		try:
			response = Response.objects.get(user=user, id=response_id)
		except:
			self._error_message("Response does not exist")

		response.text = text
		#response.anonymous = anonymous
		response.save()

		self._fire_event("edited_response",self.response_to_json(response))

	def delete_response(self, data):
		user, classroom = self._validate_user()

		message_id = data["message_id"]

		response_id = data["response_id"]

		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		try:
			response = Response.objects.get(user=user, id=response_id)
		except:
			self._error_message("Response does not exist")

		response.delete()

		self._fire_event("deleted_response",
								{
									"message_id": message_id,
									"response_id": response_id,
								}
							)

	def upvote_response(self,data):
		user, classroom = self._validate_user()

		message_id = data["message_id"]

		response_id = data["response_id"]

		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		try:
			response = Response.objects.get(user=user, id=response_id)
		except:
			self._error_message("Response does not exist")

		if len(UserResponseUpvotes.objects.filter(user=user,response=response)) == 0:
			UserResponseUpvotes.objects.create(user=user,response=response)
		else:
			self._error_message("User " + user.username + "already upvoted that response")

		upvotes = len(UserResponseUpvotes.objects.filter(response=response))
		self._fire_event("upvoted_response",
							{
								"message_id":message_id,
								"response_id":response_id,
								"upvotes":upvotes
							}
						)

	def un_upvote_response(self,data):
		user, classroom = self._validate_user()

		message_id = data["message_id"]

		response_id = data["response_id"]

		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		try:
			response = Response.objects.get(user=user, id=response_id)
		except:
			self._error_message("Response does not exist")

		if len(UserResponseUpvotes.objects.filter(user=user,response=response)) > 0:
			UserResponseUpvotes.objects.filter(user=user,response=response).delete()
		else:
			self._error_message("User " + user.username + "already upvoted that response")

		upvotes = len(UserResponseUpvotes.objects.filter(response=response))
		self._fire_event("un_upvoted_response",
							{
								"message_id":message_id,
								"response_id":response_id,
								"upvotes":upvotes
							}
						)

	def pin_message(self,data):
		user, classroom = self._validate_user()
		user_in_classroom = UserInClassroom.objects.get(user=user, classroom=classroom)
		if user_in_classroom.permission != 3:
			raise APIException("ERROR: User does not have sufficient permissions")
		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")
		if len(UserPinMessage.objects.filter(user=user, message=message)) == 0:
			UserPinMessage.objects.create(user=user, message=message, classroom=classroom)
		else:
			self._error_message("User " + user.username + " already pinned that message")
		self._fire_event("pinned_message",
							{
								"message_id":message_id,
								"pinned":True
							}
						)

	def endorse_response(self,data):
		user, classroom = self._validate_user()
		user_in_classroom = UserInClassroom.objects.get(user=user, classroom=classroom)
		#assuming user must be teacher/moderator to endorse
		if user_in_classroom.permission < 2:
			raise APIException("ERROR: User does not have sufficient permissions")

		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")

		response_id = data["response_id"]
		try:
			response = Response.objects.get(user=user, id=response_id)
		except:
			self._error_message("Response does not exist")

		if len(EndorseResponse.objects.filter(response=response)) == 0:
			EndorseResponse.objects.create(response=response, classroom=classroom)
		else:
			self._error_message("Response has already been endorsed")
		self._fire_event("endorsed_response",
							{
								"response_id":response_id,
								"endorsed":True
							}
						)

	def save_message(self,data):
		user, classroom = self._validate_user()
		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")
		if len(UserSaveQuestion.objects.filter(user=user, message=message)) == 0:
			UserSaveQuestion.objects.create(user=user, message=message)
		else:
			self._error_message("User " + user.username + " already saved that message")
		self._fire_event("saved_message",
							{
								"message_id":message_id,
								"saved":True
							}
						)

	def un_save_message(self,data):
		user, classroom = self._validate_user()
		message_id = data["message_id"]
		try:
			message = Message.objects.get(id=message_id)
		except:
			self._error_message("Not a valid message id")
		if len(UserSaveQuestion.objects.filter(user=user, message=message)) == 0:
			self._error_message("User " + user.username + " has not saved this message")
		else:
			UserSaveQuestion.objects.filter(user=user, message=message).delete()
		self._fire_event("un_saved_message",
							{
								"message_id":message_id,
								"saved":False
							}
						)

	## COMMANDS

	commands = {
		'init_chat': init_chat,
		'post_message': post_message,
		'upvote_message': upvote_message,
		'un_upvote_message': un_upvote_message,
		'post_response': post_response,
		'upvote_response': upvote_response,
		'un_upvote_response': un_upvote_response,
		'delete_message': delete_message,
		'edit_message': edit_message,
		'delete_response': delete_response,
		'edit_response': edit_response,
		'pin_message':pin_message,
		'endorse_response':endorse_response,
		'save_message':save_message,
		'un_save_message':un_save_message
	}

	## EVENT HANDLERS

	def new_message(self, event):
		# Send message to WebSocket
		self.send(text_data=json.dumps(event))

	def upvoted_message(self,event):
		self.send(text_data=json.dumps(event))

	def un_upvoted_message(self,event):
		self.send(text_data=json.dumps(event))

	# error message event handler
	def error_message(self, event):
		# Send message to WebSocket
		self.send(text_data=json.dumps(event))

	def new_response(self, event):
		self.send(text_data=json.dumps(event))

	def upvoted_response(self,event):
		self.send(text_data=json.dumps(event))

	def un_upvoted_response(self,event):
		self.send(text_data=json.dumps(event))

	def edited_message(self, event):
		self.send(text_data=json.dumps(event))

	def deleted_message(self, event):
		self.send(text_data=json.dumps(event))

	def edited_response(self, event):
		self.send(text_data=json.dumps(event))

	def deleted_response(self, event):
		self.send(text_data=json.dumps(event))

	def pinned_message(self,event):
		self.send(text_data=json.dumps(event))

	def endorsed_response(self,event):
		self.send(text_data=json.dumps(event))
	
	def saved_message(self,event):
		self.send(text_data=json.dumps(event))

	def un_saved_message(self,event):
		self.send(text_data=json.dumps(event))
