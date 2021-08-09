# views.py - all api data views

from django.shortcuts import render
from django.http import JsonResponse

# import views from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view

#import products
from .products import products


@api_view(['GET'])  # GET REST api method
# function to get routes
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create',
        '/api/products/upload',
        '/api/products/<id>/reviews',
        '/api/products/top/',
        '/api/products/<id>',
        '/api/products/delete/<id>',
        '/api/products/<update>/<id>',
    ]
    return Response(routes)


@api_view(['GET'])  # GET REST api method
# retrieve all products
def getProducts(request):
    return Response(products)


@api_view(['GET'])  # GET REST api method
# retrieve single products
def getProduct(request, pk):
    product = None

    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)
