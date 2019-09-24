from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib import messages

from django.core import serializers
from itertools import chain

import json, bcrypt
from .models import User, UserManager, Product, Order, Image

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
        # print('hitting here?')
        if 'user_id' in req.session:
            # print('here?')
            user = req.session['user_id']
            # req.session['user_id'] = user
            return JsonResponse({'message':"oneUser", 'user':user})
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
            user = User.objects.filter(email = body['email']).values().first()
            print('print user post', user)
            req.session['logged_in'] = True
            req.session['user_id'] = user
            req.session['cart'] = []
            # userss = json.loads(user)
            return JsonResponse({'message':"find", 'user':req.session['user_id']})


# class UserDetail(View):
#     def get(self, request, user_id):
#         user = User.objects.filter(id = user_id).values()
#         return JsonResponse({'message':"Success", 'user':list(user)})

#     def put(self, request):
#         return JsonResponse({'message':"Success"})


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
        product = Product.objects.all()
        img = Image.objects.all()
        test = list(chain(product, img))
        qs = Product.objects.all()
        # for a in qs:
        #     print('testtttttttt', a.image_of_product.all().values())
        # print('test qs', qs.values())
        sometest = Image.objects.values('product__name','product__description','product__price','product__stock','product__category', 'image').distinct()
        print('some test', sometest)
        twotest = Product.objects.values('id', 'name', 'description', 'price', 'stock', 'category', 'image_of_product__image')
        print('soooooooooooo test', twotest)
        # test = Product.objects.raw('SELECT * FROM tasks_app_product JOIN tasks_app_image ON tasks_app_product.id = tasks_app_image.product_id')
        print('\n\nproduct all', test)

        data = serializers.serialize('json', qs)
        
        print('image all', product)
        return JsonResponse({'message':"product get Success", 'products':list(twotest), 'logged_in':access})

    def post(self, request):
        body = json.loads(request.body.decode())
        # print('body comming', body)
        Product.objects.create(name = body['name'], description = body['description'], price = body['price'], stock = body['stock'], category = body['category'])
        Image.objects.createImg(body)

        # print('came in post view', type(body), body)
        return JsonResponse({'message':"product post Success"})


class ProductsDetail(View):
    def get(self, request, product_id):
        # print('came in get detail view', product_id)
        product = Product.objects.filter(id = product_id)
        print('see product', product)
        img = Image.objects.filter(product=product[0])
        print('trying to get image', img)
        return JsonResponse({'message':"Product get view Success", 'product':list(product.values()), 'image':list(Image.objects.filter(product=product[0]).values().all())})

    def put(self, request, product_id):
        body = json.loads(request.body.decode())
        product = Product.objects.filter(id = product_id).values().update(name = body['name'], description = body['description'], price = body['price'], stock = body['stock'], category = body['category'])
        print('what is product', product)
        Image.objects.createImg(body)

        return JsonResponse({'message':"Product put view Success"})

    def delete(self, request, product_id):
        # print('came in delete detail view', product_id)
        product = Product.objects.get(id = product_id)
        product.delete()
        return JsonResponse({'message':"Product delete view Success"})


class ProductsCategory(View):
    def get(self, request, category):
        return JsonResponse({'message':"Product category Filter", 'category':list(Product.objects.values('id', 'name', 'description', 'price', 'stock', 'category', 'image_of_product__image').filter(category = category))})


class Cart(View):
    def get(self, request):
        if 'cart' not in request.session:
            request.session['cart'] = []
        # print('printing', len(request.session['cart']))
        if(len(request.session['cart']) < 1):
            return JsonResponse({'message':"Cart"})
        else:
            return JsonResponse({'message':"Cart", 'cart':request.session['cart']})

    def post(self, request):
        print('4')
        body = json.loads(request.body.decode())
        print('5',body)
        cart = request.session['cart']
        cart.append(body)
        request.session['cart'] = cart
        # request.session['cart'].append(body)
        print('\n\n session', request.session['cart'])
        return JsonResponse({'message':"Cart post", 'cart':request.session['cart']})

    def delete(self, request):
        del request.session['cart']
        return JsonResponse({'message':"Cart Out"})


class OrderProcess(View):
    def get(self, request):
        if 'user_id' in request.session:
            if Order.objects.filter(user_id=request.session['user_id']['id']):
                order = Order.objects.get(user_id=request.session['user_id']['id'])
                return JsonResponse({'message':"Orderssssssss", 'order':list(order.product.values().all())})
            else:
                return JsonResponse({'message':'need to guest Id'})
        
    def post(self, request):
        print('request', request)
        body = json.loads(request.body.decode())
        print('order process body', body)
        print('order user', request.session['user_id']['id'])
        userId = request.session['user_id']['id']
        matching_user = Order.objects.filter(user_id=userId)
        if len(matching_user) < 1:
            Order.objects.create(user=User.objects.get(id=userId))
        
            # print('testing', Order.objects.values().all())

            for x in body:
                print('hi\n', x)
            #     # print('x id', x['id'])
                print('whats wrong1')
                order = Order.objects.get(user_id=userId)
                products = Product.objects.get(id=x['id'])
            #     # print('\n\n\nproducts', products)
                order.products.add(products)
                print('whats wrong2')
            order.save()
            print('whats wrong3')
            # print('testing', Order.objects.values().all())
            # testing = Order.objects.filter(id=23).values().all()
            # print('testing one order', testing.product.all())
            print('\n\ntesting one order1', order.products.all().values())
            # Object.objects.values().filter(category = category)
            # print('\n\ntesting one order1', order.product.all().values())

            return JsonResponse({'message':"Order", 'order':list(Order.objects.get(user_id=userId).products.values().all())})

    def delete(self, request):
        if 'user_id' in request.session:
            order = Order.objects.filter(user_id=request.session['user_id']['id'])
            order.delete()
            return JsonResponse({'message':"Order deleted"})
        else:
            return JsonResponse({'message':'need to guest Id for delete'})

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
