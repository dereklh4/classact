from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
import channels
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Message
from django.core import serializers

class ChatConsumer(WebsocketConsumer):


    def connect(self):
        #set chatroom name
        print(self.scope['url_route'])
        self.room_name = self.scope['url_route']['kwargs']['chatroom_id']
        self.room_group_name = self.room_name

        #check token
        try:
            token = Token.objects.get(key=self.scope['url_route']['kwargs']['token'])
        except:
            print("ERROR: Not a valid token for websocket connection")
            return
            
        self.scope["user"] = token.user

        #TODO: Check that classroom exists in database

        #TODO: Check that user is in that classroom

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

    def post_message(self, data):
        username = self.scope["user"]
        if username == None:
            self._error_message("ERROR: Empty username")
            return

        text = data['text']

        try:
            user = User.objects.get(username=username)
        except:
            self._error_message("Not a valid user: " + str(username))
            return

        #TODO: Check that user is part of chatroom they are posting to

        #TODO: Check that chatroom exists
        try:
            classroom = Classroom.objects.get(pk=self.room_group_name)
        except:
            pass
        #     self._error_message("ERROR: Classroom does not exist")

        message = Message.objects.create(user=user, text=text) #TODO: Add classroom

        self._post_message({
            'id': message.id,
            'user': message.user.username,
            'text': message.text,
            'hour': message.creation_time.hour,
            'minute':message.creation_time.minute,
            'second':message.creation_time.second
        })

    def _post_message(self, message):
        # Send message to room group
        print("broadcasting message post:" + str(message))
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'new_message',
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

    # New message event handler
    def new_message(self, event):
        # Send message to WebSocket
        self.send(text_data=json.dumps(event))

    # error message event handler
    def error_message(self, event):
        # Send message to WebSocket
        self.send(text_data=json.dumps(event))

    commands = {
        'post_message': post_message
    }
