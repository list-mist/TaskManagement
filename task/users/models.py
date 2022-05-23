from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.forms import PasswordInput
# Create your models here.
class Account(AbstractBaseUser):
    email = models.EmailField(blank = False,unique = True)
    username = models.CharField(max_length=150)
    
    USERNAME_FIELD = 'email'