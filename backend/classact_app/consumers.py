from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
import channels

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        #accept connection
        self.accept()
        print("connected")

    def disconnect(self, close_code):
        # leave group room
        print("disconnected")

    def receive(self, text_data):
        data = json.loads(text_data)
        print("Recieved data: " + str(data))

        #perhaps perform some command, broadcasting to group
        #self.commands[data['command']](self, data)
        async_to_sync(self.channel_layer.group_send)(self.room_group_name,"recieved data: " + str(data))
