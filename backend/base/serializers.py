# serializers will take the data and return it in JSON format (Django REST api)
from rest_framework import serializers

# import models
from accounts.models import User
from .models import Product


# product serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # all fields

        # for specific fields:
        # fields = 'name', 'salesPrice'
