from django.db import models
from datetime import datetime 
# Create your models here.
class room(models.Model):
    username=models.CharField(max_length=20,blank=False)
    roomcode=models.CharField(max_length=10,blank=False,unique=True)
    password=models.CharField(max_length=10,blank=False)
class msg(models.Model):
    value=models.CharField(max_length=10000,blank=True)
    date=models.DateTimeField(default=datetime.now,blank=True)
    username=models.CharField(max_length=20,blank=True)
    roomcode=models.CharField(max_length=10,blank=True)