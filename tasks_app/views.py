from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib import messages
import json, bcrypt
from .models import User, UserManager, Product

# Create your views here.

class Users(View):
    def get(self, req):
        return JsonResponse({'message':"Success", 'user': list(User.objects.values().all())})

    def post(self, req):
        # print('change?')
        # print('test post',req.body)
        # print(type(body), body)
        # print(User.objects.register_validator(body))
        body = json.loads(req.body.decode())
        errors = User.objects.register_validator(body)

        print(errors)
        if len(errors) > 0:
            return JsonResponse({'message': 'Error', 'errors':errors})
        else:
            hashpw = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
            print(hashpw)
            print(hashpw.decode())
            user = User.objects.create(first_name = body['first_name'], last_name = body['last_name'], email = body['email'], password = hashpw.decode())
            return JsonResponse({'message':'Success'})
class OneUser(View):
    def get(self, req):
        print('hitting here?')
        if 'user_id' in req.session:
            print('here?')
            return JsonResponse({'message':"oneUser", 'id':req.session['user_id']})
        return JsonResponse({'message':"error occur"})

    def post(self, req):
        # print('no decode', type(req.body), req.body)
        body = json.loads(req.body.decode())
        # print('decode', type(body), body)
        errors = User.objects.login_validator(body)
        # print('print errors', errors)
        if len(errors) > 0:
            return JsonResponse({'message': 'Error', 'errors':errors})
        else:
            user = User.objects.filter(email = body['email']).values()
            print('print user post', user[0])
            req.session['logged_in'] = True
            req.session['user_id'] = user[0]['id']
            return JsonResponse({'message':"find", 'user':list(user)})
class UserDetail(View):
    def get(self, request, user_id):
        user = User.objects.filter(id = user_id).values()        
        return JsonResponse({'message':"Success", 'user':list(user)})
    def put(self, request):
        return JsonResponse({'message':"Success"})
class UserLogOut(View):
    def get(self, request):
        del request.session['logged_in']
        del request.session['user_id']
        return JsonResponse({'message':"User Logged Out"})



class Products(View):
    def get(self, request):
        print('came in get view')
        access = True
        if 'logged_in' not in request.session:
            access = False
        return JsonResponse({'message':"product get Success", 'products':list(Product.objects.values().all()), 'logged_in':access})

    def post(self, request):
        body = json.loads(request.body.decode())
        print('came in post view', type(body), body)
        product = Product.objects.create(name = body['name'], description = body['description'], price = body['price'], stock = body['stock'], category = body['category'])
        return JsonResponse({'message':"product post Success"})

class ProductsDetail(View):
    def get(self, request, product_id):
        print('came in get detail view', product_id)
        product = Product.objects.filter(id = product_id).values()
        return JsonResponse({'message':"Product get view Success", 'product':list(product)})
    def put(self, request, product_id):
        print('came in put detail view')
        return JsonResponse({'message':"Product put view Success"})
    def delete(self, request, product_id):
        print('came in delete detail view', product_id)
        product = Product.objects.get(id = product_id)
        product.delete()
        return JsonResponse({'message':"Product delete view Success"})

# class Author(models.Model):
#     name = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
# class Book(models.Model):
#     title = models.CharField(max_length=255)
#     author = models.ForeignKey(Author, related_name="books")
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
# this_author = Author.objects.get(id=2)	# get an instance of an Author
# my_book = Book.objects.create(title="Little Women", author=this_author)	# set the retrieved author as the author of a new book
    
# # or in one line...
# my_book = Book.objects.create(title="Little Women", author=Author.objects.get(id=2))
