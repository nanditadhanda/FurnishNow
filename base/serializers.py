# serializers will retrieve data from database and return it in JSON format (Django REST api)

# import django_rest framework serializer module
from rest_framework import serializers

# import models
from accounts.models import User
from .models import Product, Category, Order, OrderItem, ShippingAddress, Review

# import user serializer
from accounts.serializers import UserSerializer

# review serializer


class ReviewSerializer(serializers.ModelSerializer):
    # get user details
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')

    class Meta:
        model = Review
        fields = '__all__'


# product serializer


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    # get category details
    category_id = serializers.ReadOnlyField(source='category.id')
    category = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = Product
        fields = '__all__'  # all fields

    def get_reviews(self, obj):
        # retrieve all reviews
        reviews = obj.review_set.all()
        # serialize reviews from review serializer
        serializer = ReviewSerializer(reviews, many=True)
        # return serialized data
        return serializer.data


# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'products')  # all fields


# Shipping Address serializer
class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'  # all fields


# Order Item serializer
class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'  # all fields


# Order  serializer - main serializer
class OrderSerializer(serializers.ModelSerializer):
    # order items, shippingAddress and user serializers will be retrieved and returned as a nested object in OrderSerializer

    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'  # all fields

    # get all order data
    def get_orderItems(self, obj):
        # All order items are merged and associated with order model
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)

        return serializer.data

    # get shipping address associated with order
    def get_shippingAddress(self, obj):
        # if address is found, return address otherwise return "False"
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False

        return address

    # get user data associated with order
    def get_user(self, obj):
        # User information associated with order
        user = obj.user
        serializer = UserSerializer(user, many=False)

        return serializer.data
