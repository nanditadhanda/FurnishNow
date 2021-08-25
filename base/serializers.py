# serializers will retrieve data from database and return it in JSON format (Django REST api)

# import django_rest framework serializer module
from rest_framework import serializers

# import models
from accounts.models import User
from .models import Product, Category


# product serializer
class ProductSerializer(serializers.ModelSerializer):

    category = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = Product
        fields = '__all__'  # all fields


# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'products')  # all fields

# Category serializer
