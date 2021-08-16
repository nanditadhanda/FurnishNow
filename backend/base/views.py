# views.py - all api data views

from django.shortcuts import render
from django.http import JsonResponse

# import views from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view

#import models
from .models import Category, Product

# import serializers (models converted to JSON format)
from .serializers import ProductSerializer

#import products
# from .products import products


# function to get routes

@api_view(['GET'])  # GET REST api method
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/<category>',
        '/api/products/create',
        '/api/products/upload',
        '/api/products/<id>/reviews',
        '/api/products/top/',
        '/api/products/<id>',
        '/api/products/delete/<id>',
        '/api/products/<update>/<id>',
    ]
    return Response(routes)


# retrieve all products

@api_view(['GET'])  # GET REST api method
def getProducts(request):
    # get products from database
    products = Product.objects.all()

    # serialize into JSON format
    serializer = ProductSerializer(products, many=True)

    # return serialized data
    return Response(serializer.data)


# retrieve single products

# GET REST api method
@api_view(['GET'])
def getProduct(request, pk):

    # get single product
    product = Product.objects.get(_id=pk)
    # serialize into json format
    serializer = ProductSerializer(product, many=False)

    # return serialized data
    return Response(serializer.data)

    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break
    # return Response(product)
