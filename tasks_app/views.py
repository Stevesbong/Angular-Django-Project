from django.http import JsonResponse
from django.views import View
from django.contrib import messages
import json, bcrypt
from .models import User, UserManager

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
            # print('check type', type(list(user)))
            # print(json.dumps(user[0]))
            return JsonResponse({'message':"find", 'user':list(user)})





class UserDetail(View):
    def get(self, request, user_id):
        user = User.objects.filter(id = user_id).values()
        return JsonResponse({'message':"Success", 'user':list(user)})
    def put(self, request):
        return JsonResponse({'message':"Success"})