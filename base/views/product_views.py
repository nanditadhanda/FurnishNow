# product_views.py - all product views

from django.shortcuts import render
from rest_framework import serializers

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

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

# create product view


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        brand='Sample Brand',
        costPrice=0.00,
        salePrice=0.00,
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# Update product view


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, id):

    # get product to be updated
    product = Product.objects.get(_id=id)

    # data passed in request form
    data = request.data

    # update data
    product.name = data['name']
    product.brand = data['brand']
    #product.category = data['category']
    product.description = data['description']
    # product.image = data['image']
    #product.image3D = data['image3D']
    product.countInStock = data['countInStock']
    product.costPrice = data['costPrice']
    product.salePrice = data['salePrice']

    # save data
    product.save()

    # pass into serializer
    serializer = ProductSerializer(product, many=False)

    # return
    return Response(serializer.data)


# request to upload image
@api_view(['POST'])
def uploadProductImage(request):

    # get the data passed in from front end
    data = request.data

    # set product ID
    product_id = data['product_id']

    # retrieve product
    product = Product.objects.get(_id=product_id)

    # upload image to product
    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


# Delete product view
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(_id=id)
    product.delete()
    return Response('Product has been deleted')
