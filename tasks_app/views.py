from django.http import JsonResponse
from django.views import View
import json
from .models import *

# Create your views here.

class Users(View):
    def get(self, request):
        return JsonResponse({'message':"Success"})

    def post(self, req):
        print('change?')
        body = json.loads(req.body.decode())
        print(type(body), body)
        return JsonResponse({'message':"Success"})

class UserDetail(View):
    def get(self, request):
        return JsonResponse({'message':"Success"})
    def put(self, request):
        return JsonResponse({'message':"Success"})