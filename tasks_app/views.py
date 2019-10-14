from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.contrib import messages
import stripe
from django.db.models import Count
import json, bcrypt
from .models import User, UserManager, Product, Order, Image





stripe.api_key = 'sk_test_I7gN9gxFTJRo07i6O4rjUlc000WPMU4tnB'




class Users(View):
    def get(self, req):
        return JsonResponse({'message':"Success", 'user': list(User.objects.values().all())})

    def post(self, req):
        body = json.loads(req.body.decode())
        errors = User.objects.register_validator(body)
        if len(errors) > 0:
            return JsonResponse({'message': 'Error', 'errors':errors})
        else:
            hashpw = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
            User.objects.create(first_name = body['first_name'], last_name = body['last_name'], email = body['email'], password = hashpw.decode())
            return JsonResponse({'message':'Success'})

class OneUser(View):
    def get(self, req):
        if 'user_id' in req.session:
            user = req.session['user_id']
            return JsonResponse({'message':"oneUser", 'user':user})
        return JsonResponse({'message':"error occur"})

    def post(self, req):
        body = json.loads(req.body.decode())
        errors = User.objects.login_validator(body)
        if len(errors) > 0:
            return JsonResponse({'message': 'Error', 'errors':errors})
        else:
            user = User.objects.filter(email = body['email']).values().first()
            req.session['logged_in'] = True
            req.session['user_id'] = user
            req.session['cart'] = []
            return JsonResponse({'message':"find", 'user':req.session['user_id']})

class UserLogOut(View):
    def get(self, request):
        del request.session['logged_in']
        del request.session['user_id']
        return JsonResponse({'message':"User Logged Out"})


class Products(View):
    def get(self, request):
        access = True
        if 'logged_in' not in request.session:
            access = False
        products = Product.objects.values('id', 'name', 'description', 'price', 'stock', 'category', 'image_of_product__image')
        return JsonResponse({'message':"product get Success", 'products':list(products), 'logged_in':access})

    def post(self, request):
        body = json.loads(request.body.decode())
        Product.objects.create(name = body['name'], description = body['description'], price = body['price'], stock = body['stock'], category = body['category'])
        Image.objects.createImg(body)
        return JsonResponse({'message':"product post Success"})

class ProductsDetail(View):
    def get(self, request, product_id):
        product = Product.objects.filter(id = product_id)
        img = Image.objects.filter(product=product[0])
        return JsonResponse({'message':"Product get view Success", 'product':list(product.values()), 'image':list(Image.objects.filter(product=product[0]).values().all())})

    def put(self, request, product_id):
        body = json.loads(request.body.decode())
        product = Product.objects.filter(id = product_id).values().update(name = body['name'], description = body['description'], price = body['price'], stock = body['stock'], category = body['category'])
        Image.objects.createImg(body)
        return JsonResponse({'message':"Product put view Success"})

    def delete(self, request, product_id):
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
        if(len(request.session['cart']) < 1):
            return JsonResponse({'message':"Cart"})
        else:
            return JsonResponse({'message':"Cart", 'cart':request.session['cart']})

    def post(self, request):
        body = json.loads(request.body.decode())
        cart = request.session['cart']
        cart.append(body)
        request.session['cart'] = cart
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
        body = json.loads(request.body.decode())
        userId = request.session['user_id']['id']
        matching_user = Order.objects.filter(user_id=userId)
        if len(matching_user) < 1:
            Order.objects.create(user=User.objects.get(id=userId))
            for x in body:
                order = Order.objects.get(user_id=userId)
                p = Product.objects.get(id=x['id'])
                order.products.add(p)
            order.save()
            return JsonResponse({'message':"Order", 'order':list(Order.objects.get(user_id=userId).products.values().all())})
    
    def delete(self, request):
        if 'user_id' in request.session:
            order = Order.objects.filter(user_id=request.session['user_id']['id'])
            order.delete()
            return JsonResponse({'message':"Order deleted"})
        else:
            return JsonResponse({'message':'need to guest Id for delete'})


class CheckoutProcess(View):
    def post(self, request):
        body = json.loads(request.body.decode())
        session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'name': body[0]['name'],
            'description': body[0]['name'],
            'images': ['https://example.com/t-shirt.png'],
            'amount': 500,
            'currency': 'usd',
            'quantity': 1,
        }],
        success_url='http://localhost:8000/shop',
        cancel_url='http://localhost:8000/home',
        )
        return JsonResponse({'message':'checkout process success', 'session':session})