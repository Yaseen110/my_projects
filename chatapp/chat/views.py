from django.shortcuts import render,redirect
from django.contrib import messages
from .models import room,msg
from django.contrib.auth.models import User
from django.contrib import auth
# Create your views here.
def home(request):
    if request.method=="POST":
        roomcode=request.POST['roomcode']
        password=request.POST['password']
        username=request.POST['username']
        if room.objects.filter(roomcode=roomcode).exists():
            if room.objects.get(roomcode=roomcode).password==password:
                if User.objects.filter(username=username).exists():
                    auth.login(request,User.objects.get(username=username))
                else:
                    user=User.objects.create_user(username=username)
                    user.save()
                    auth.login(request,user)
                return redirect('/room/'+roomcode)
            else:
                messages.info(request,"room not found! please enter valid room details or else create a room")
                return redirect('/')
        else:
            messages.info(request,"please enter valid room details or else create a room")
            return redirect('/')
    else:
        return render(request,"home.html")
def room_page(request,pk):
    username=auth.get_user(request).username
    if(room.filter(roomcode=roomcode).exists()):
        if request.method=='POST':
            roomcode=pk
            value=request.POST['message']
            msg.objects.create(roomcode=roomcode,value=value,username=username)
            return redirect("/room/"+pk)
        else:
            msgs=msg.objects.filter(roomcode=pk)
            return render(request,"room.html",{"msgs":msgs,"roomcode":pk,"username":username})
    else:
        return redirect("/")
def createroom(request):
    if request.method=="POST":
        roomcode=request.POST['roomcode']
        password=request.POST['password']
        username=request.POST['username']
        if room.objects.filter(roomcode=roomcode).exists():
            messages.info(request,"roomcode already active please use another one")
            return redirect('/')
        else:
            if(User.objects.filter(username=username).exists()):
                auth.login(request,User.objects.get(username=username))
            else:
                user=User.objects.create_user(username=username)
                user.save()
                auth.login(request,user)
            room.objects.create(roomcode=roomcode,password=password,username=username)
            return redirect('/room/'+roomcode)
    else:
        return render(request,"createroom.html")
def close(request,pk):
    auth.logout(request)
    roomobject = room.objects.get(roomcode=pk)
    roomobject.delete()
    return redirect("/")