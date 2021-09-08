# product_views.py - all product views

from django.shortcuts import render

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view

#import models
from base.models import Product

# import serializers (models converted to JSON format)
from base.serializers import ProductSerializer


# get all products
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
