# views.py - all api data views
from django.shortcuts import render

# import views from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view

#import models
from base.models import Category

# import serializers (models converted to JSON format)
from base.serializers import CategorySerializer

# retrieve single category


@api_view(['GET'])  # GET REST api method
def getCategory(request, category_slug):
    # get Category from database
    category = Category.objects.get(slug=category_slug)

    # serialize into JSON format
    serializer = CategorySerializer(category, many=False)

    # return serialized data
    return Response(serializer.data)


# retrieve all categories
@api_view(['GET'])
def getCategories(request):
    # get categories from database
    categories = Category.objects.all()

    # serialize into JSON format
    serializer = CategorySerializer(categories, many=True)

    # return serialized data
    return Response(serializer.data)
