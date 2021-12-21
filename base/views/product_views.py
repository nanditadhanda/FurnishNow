# product_views.py - all product views

from datetime import datetime

from django.core import paginator
from base.serializers import ProductSerializer
from accounts.models import User
from base.models import Product, Review
from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework import generics

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# import django pagination library
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# import models
from base.models import Product, Review, Category
from accounts.models import User

# import filters
from base.filters import ProductFilter
from rest_framework.filters import OrderingFilter, SearchFilter
import django_filters

# import serializers (models converted to JSON format)
from base.serializers import ProductSerializer

# import datetime library
from datetime import datetime


# get all products
@api_view(['GET'])  # GET REST api method
def getProducts(request):

    # if search parameters are passed
    query = request.query_params.get('search')
    sort = request.query_params.get('ordering')

    # if no search value is passed set query string to empty string
    if query == None:
        query = ''

    # if order filter is not applied, by default sort by id
    if sort == None:
        sort = '_id'

    # get products from database - filter based on query sent - by name with case insenstive
    products = Product.objects.filter(name__icontains=query).order_by(sort)

    dict_params = dict(request.query_params.lists())

    filter = ProductFilter(request.GET, queryset=products)
    if filter.is_valid():
        products = filter.qs

    # pagination
    page = request.query_params.get('page')
    # return 10 products per page
    paginator = Paginator(products, 9)

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

# get all products


@api_view(['GET'])  # GET REST api method
def getTopProducts(request):

    # get products from database - filter based on query sent - by name with case insenstive
    products = Product.objects.order_by('-rating')[:4]

    # serialize into JSON format
    serializer = ProductSerializer(products, many=True)

    # return serialized data along with pagination as an object
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
@permission_classes([IsAuthenticated])
def createProduct(request):
    user = request.user

    # check if user is store manager
    if user.is_storeManager:
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

    else:
        return Response({'detail': 'You are not authorized to perform this action'},
                        status=status.HTTP_400_BAD_REQUEST)

# Update product view


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, id):

    user = request.user

    # check if user is store manager
    if user.is_storeManager:
        # get product to be updated
        product = Product.objects.get(_id=id)

        # data passed in request form
        data = request.data

        # update data
        product.name = data['name']
        product.brand = data['brand']
        product.category = Category.objects.get(id=data['category'])
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
    else:
        return Response({'detail': 'You are not authorized to perform this action'},
                        status=status.HTTP_400_BAD_REQUEST)


# request to upload image
@ api_view(['POST'])
def uploadProductFile(request):

    try:

        # get the data passed in from front end
        data = request.data

        # set product ID
        product_id = data['product_id']

        # retrieve product
        product = Product.objects.get(_id=product_id)

        # upload image to product
        if(data['image']):
            product.image = request.FILES.get('image')
        if(data['model3D']):
            product.model3D = request.FILES.get('model3D')
        product.save()

        return Response('Image was uploaded')

    except Exception as e:
        return Response({'detail': str(e)},
                        status=status.HTTP_400_BAD_REQUEST)


# Delete product view
@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def deleteProduct(request, id):
    user = request.user

    # check if user is store manager
    if user.is_storeManager:
        product = Product.objects.get(_id=id)
        product.delete()
        return Response('Product has been deleted')
    else:
        return Response({'detail': 'You are not authorized to perform this action'},
                        status=status.HTTP_400_BAD_REQUEST)


# leave product review view
@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def createProductReview(request, id):
    # get user information from token passed
    user = request.user

    # get product information from Product model
    product = Product.objects.get(_id=id)

    # retrieve data passed
    data = request.data

    # get order data
    orderID = data['order']
    order = Product.objects.get(_id=orderID)

    # ------- Leaving a review------------

    # 1 - check if review exists
    reviewExists = product.review_set.filter(order=order).exists()

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
            order=order,
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
