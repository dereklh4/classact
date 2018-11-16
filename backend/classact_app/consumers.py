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
        print("broadcasting message post:" + str(message))
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
        return {
            'id': message.id,
            'user': message.user.username,
            'text': message.text,
            'hour': message.creation_time.hour,
            'minute':message.creation_time.minute,
            'second':message.creation_time.second,
            'upvotes':len(message_upvotes),
            'upvoted_by_user':upvoted_by_user,
            'anonymous':message.anonymous,
            'responses': list(map(lambda x: self.response_to_json(x), responses))
        }

    def response_to_json(self, response):
        return {
            'message_id': response.message.id,
            'response_id': response.id,
            'user': response.user.username,
            'text': response.text,
            'hour': response.creation_time.hour,
            'minute':response.creation_time.minute,
            'second':response.creation_time.second,
            'anonymous':response.anonymous,
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

        self._fire_event("edit_message",
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

        self._fire_event("delete_message", {"message_id":message_id})

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
            response = Response.objects.get(user=user, response_id=response_id)
        except:
            self._error_message("Response does not exist")

        response.text = text
        #response.anonymous = anonymous
        response.save()

        self._fire_event("edit_response",self.response_to_json(response))

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

        self._fire_event("delete_response",
                                {
                                    "message_id": message_id,
                                    "response_id": response_id,
                                }
                            )

    ## COMMANDS

    commands = {
        'init_chat': init_chat,
        'post_message': post_message,
        'upvote_message': upvote_message,
        'un_upvote_message': un_upvote_message,
        'post_response': post_response,
        'delete_message': delete_message,
        'edit_message': edit_message,
        'delete_response': delete_response,
        'edit_response': edit_response
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

    def edit_message(self, event):
        self.send(text_data=json.dumps(event))

    def delete_message(self, event):
        self.send(text_data=json.dumps(event))

    def edit_response(self, event):
        self.send(text_data=json.dumps(event))

    def delete_response(self, event):
        self.send(text_data=json.dumps(event))
