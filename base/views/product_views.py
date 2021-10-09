# product_views.py - all product views

from datetime import datetime

from django.core import paginator
from base.serializers import ProductSerializer
from accounts.models import User
from base.models import Product, Review
from django.shortcuts import render
from rest_framework import serializers, status

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# import django pagination library
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# import models
from base.models import Product, Review
from accounts.models import User

# import serializers (models converted to JSON format)
from base.serializers import ProductSerializer

# import datetime library
from datetime import datetime


# get all products
@api_view(['GET'])  # GET REST api method
def getProducts(request):

    # if search parameters are passed
    query = request.query_params.get('search')

    # if no search value is passed set query string to empty string
    if query == None:
        query = ''

    # get products from database - filter based on query sent - by name with case insenstive
    products = Product.objects.filter(name__icontains=query)

    # pagination
    page = request.query_params.get('page')
    # return 10 products per page
    paginator = Paginator(products, 10)

    # ----pagination exception handling---

    # by default, return the data of the page number passed in according to the paginator
    try:
        products = paginator.page(page)

    # if no page number is passed, return the first page
    except PageNotAnInteger:
        products = paginator.page(1)

    # if page number passed returns no data, return the last page in the paginator that has data present in it
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    # if no page number is passed in from front end, set page to 1 by default
    if page == None:
        page = 1

    # convert value of page to integer
    page = int(page)

    # serialize into JSON format
    serializer = ProductSerializer(products, many=True)

    # return serialized data along with pagination as an object
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages


    })


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
    # product.category = data['category']
    product.description = data['description']
    # product.image = data['image']
    # product.image3D = data['image3D']
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


# leave product review view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, id):
    # get user information from token passed
    user = request.user

    # get product information from Product model
    product = Product.objects.get(_id=id)

    # retrieve data passed
    data = request.data

    # ------- Leaving a review------------

    # 1 - check if review exists
    reviewExists = product.review_set.filter(user=user).exists()

    if reviewExists:
        # define error message
        content = {'detail': 'Product already reviewed'}
        # return error message in HTTP response status
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No rating or if rating is 0
    elif data['rating'] == 0:
        # define error message
        content = {'detail': 'Please enter a rating for the product'}
        # return error message in HTTP response status
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - create the review
    else:
        review = Review.objects.create(
            product=product,
            user=user,
            title=data['title'],
            rating=data['rating'],
            comment=data['comment'],
            reviewDate=datetime.now()
        )

    # ----calculate total number of reviews ----

    reviews = product.review_set.all()
    numReviews = len(reviews)
    product.numReviews = numReviews

    # ----calculate average rating----

    # calculate total
    total = 0
    for i in reviews:
        # add rating of i product to total
        total += i.rating

    # calculate average and set product rating
    product.rating = total / numReviews

    # save product data
    product.save()

    # --------return success message--------
    return Response("Review Added")
