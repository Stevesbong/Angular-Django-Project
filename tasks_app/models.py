from __future__ import unicode_literals
from django.db import models
import re
import bcrypt
from django.conf import settings
import os, time, base64
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

ALLOWED_EXTENSIONS = ("jpg", "jpeg", "png", "gif")

# Create your models here.

class UserManager(models.Manager):
    def register_validator(self, postBody):
        errors = {}
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
        matching_user = User.objects.filter(email = postBody['email'])
        if len(matching_user) == 0:
            errors['login_email'] = "Invalid Credential"
        elif postBody['password'] == "":
            errors['password'] = "Please enter the password"
        elif not bcrypt.checkpw(postBody['password'].encode(), matching_user[0].password.encode()):
            errors['login_password'] = "Invalied Credential"
        return errors
class PostManager(models.Manager):
    def createImg(self, data):
        product = Product.objects.filter(name=data['name'])
        post = Image.objects.create(product=product[0])
        if 'filename' in data and 'image' in data:
            extension = data['filename'].split('.')[-1].lower()
            if extension in ALLOWED_EXTENSIONS:
                post.filename = data['filename']
                new_filename = str(time.time()).split('.')[0] + '.' + extension
                img_path = os.path.join(settings.MEDIA_ROOT, new_filename)
                with open (img_path, 'wb') as img:
                    img.write(base64.b64decode(data['image'].split(',')[-1]))
                    post.image = new_filename
        post.save()

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = UserManager()

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null = True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.CharField(max_length = 60)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Image(models.Model):
    product = models.ForeignKey(Product, related_name="image_of_product", on_delete=models.CASCADE)
    image = models.FileField(upload_to='media/')
    objects = PostManager()

class Order(models.Model):
    products = models.ManyToManyField(Product, related_name = "orders")
    user = models.ForeignKey(User, related_name = "user_order", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Checkout(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)