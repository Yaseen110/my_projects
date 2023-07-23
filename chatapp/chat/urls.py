from django.urls import path
from . import views
urlpatterns=[
    path("",views.home,name="home"),
    path("room/<str:pk>",views.room_page,name="room_page"),
    path("createroom",views.createroom,name="createroom"),
    path("close/<str:pk>",views.close,name="close"),
]