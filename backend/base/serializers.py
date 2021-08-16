# serializers will retrieve data from database and return it in JSON format (Django REST api)

# import django_rest framework serializer module
from rest_framework import serializers

# import models
from accounts.models import User
from .models import Product, Category


# product serializer
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'  # all fields

        # for specific fields:
        # fields = 'name', 'salesPrice'


# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # all fields
