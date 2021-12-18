# views.py - all api data views
from django.shortcuts import render

# import views from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers, status

#import models
from base.models import Category

# import serializers (models converted to JSON format)
from base.serializers import CategorySerializer

# retrieve single category


@api_view(['GET'])  # GET REST api method
def getCategory(request, slug):
    try:
        # get Category from database
        category = Category.objects.get(slug=slug)

        # serialize into JSON format
        serializer = CategorySerializer(category, many=False)

        # return serialized data
        return Response(serializer.data)
    except:
        return Response({'detail': 'Failed to load categories details. Invalid category slug defined'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# retrieve all categories
@api_view(['GET'])
def getCategories(request):

    try:
        # get categories from database
        categories = Category.objects.all().order_by('name')

        # serialize into JSON format
        serializer = CategorySerializer(categories, many=True)

        # return serialized data
        return Response(serializer.data)
    except:
        return Response({'detail': 'Failed to load categories.'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# create category view


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):

    user = request.user
    data = request.data
    # check if user is store manager
    if user.is_storeManager:

        try:
            categoryExists = Category.objects.filter(
                slug=data['slug']).exists()

            if categoryExists:
                # define error message
                content = {
                    'detail': 'Category with duplicate name already exists'}
                # return error message in HTTP response status
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            else:
                # 2a) Check if image passed or not
                if(data['image']):
                    category = Category.objects.create(
                        name=data['name'],
                        slug=data['slug'],
                        image=request.FILES.get('image')
                    )
                else:
                    category = Category.objects.create(
                        name=data['name'],
                        slug=data['slug']
                    )

                serializer = CategorySerializer(category, many=False)
                return Response(serializer.data)
        except Exception as e:
            return Response({'detail': str(e)})

    else:
        content = {
            'detail': 'You are not authorized to perform this action'}
        return Response(content,
                        status=status.HTTP_400_BAD_REQUEST)


# update Category


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCategory(request, id):

    user = request.user

    # check if user is store manager
    if user.is_storeManager:
        # get category to be updated
        category = Category.objects.get(id=id)

        # data passed in request form
        data = request.data

        # update data
        category.name = data['name']
        category.slug = data['slug']
        # upload image to category
        if(data['image']):
            category.image = request.FILES.get('image')

        # save data
        category.save()

        # pass into serializer
        serializer = CategorySerializer(category, many=False)

        # return
        return Response(serializer.data)
    else:
        return Response({'detail': 'You are not authorized to perform this action'},
                        status=status.HTTP_400_BAD_REQUEST)

# Delete category view


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def deleteCategory(request, id):

    # cannot delete "uncategorized" category
    try:
        user = request.user
        # check if user is store manager
        if user.is_storeManager:
            category = Category.objects.get(id=id)
            category.delete()
            return Response('Category has been deleted')
        else:
            return Response({'detail': 'You are not authorized to perform this action'},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'This category cannot be deleted'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
