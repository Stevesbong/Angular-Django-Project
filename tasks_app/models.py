from __future__ import unicode_literals
from django.db import models
import re
import bcrypt
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.

class UserManager(models.Manager):
    def register_validator(self, postBody):
        errors = {}
        # print('test in models', type(postBody), postBody)
        # print('test each body', postBody["first_name"])
        # print('test password', postBody['password'])
        # if 'first_name' in postBody:
        #     print('yes')
        # else:
        #     print('no')
        # for key, val in postBody.items():
        #     print(key, ' and ', val)
        matching_user = User.objects.filter(email = postBody['email'])
        if len(postBody['first_name']) < 3 or postBody['first_name'] == "":
            errors['first_name'] = "First name must be more than three characters."
        if len(postBody['last_name']) < 3:
            errors['last_name'] = "Last name must be more than three characters."
        if not EMAIL_REGEX.match(postBody['email']):
            errors['email'] = "Email must meet the validation."
        if len(matching_user) > 0:
            errors['taken_email'] = "Email is already taken."
        if len(postBody['password']) < 8:
            errors['password'] = "password must be more than eight characters."
        if postBody['password'] != postBody['confirm_password']:
            errors['confirm_password'] = "Confirm password must match with password."
        return errors

    def login_validator(self, postBody):
        errors = {}
        # print('models',type(postBody), postBody)
        # print(postBody['email'])
        # print(postBody['password'])
        matching_user = User.objects.filter(email = postBody['email'])
        if len(matching_user) == 0:
            errors['login_email'] = "Invalid Credential"
        elif postBody['password'] == "":
            errors['password'] = "Please enter the password"
        elif not bcrypt.checkpw(postBody['password'].encode(), matching_user[0].password.encode()):
            errors['login_password'] = "Invalied Credential"
        return errors


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = UserManager()