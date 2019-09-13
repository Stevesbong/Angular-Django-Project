"""tasks URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path
from tasks_app.views import Users, OneUser, UserLogOut, Products, ProductsDetail, ProductsCategory, Cart

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/tasks', Users.as_view()),
    path('api/tasks/user', OneUser.as_view()),
    # path('api/user/<int:user_id>', UserDetail.as_view()),
    path('api/user/logout', UserLogOut.as_view()),
    path('api/product', Products.as_view()),
    path('api/product/<int:product_id>', ProductsDetail.as_view()),
    path('api/product/<category>', ProductsCategory.as_view()),
    path('api/cart', Cart.as_view())
]
