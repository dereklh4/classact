"""Defines routing for channels"""

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.conf.urls import url
from django.urls import path
from classact_app import consumers

websocket_urlpatterns = [
    #url(r'ws/chat$', consumers.ChatConsumer),
    path("ws/chat/<chatroom_id>", consumers.ChatConsumer)
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})