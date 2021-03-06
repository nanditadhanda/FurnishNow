# serializers will retrieve data from database and return it in JSON format (Django REST api)

# import django_rest framework serializer module
from rest_framework import serializers

# import models
from accounts.models import User
from .models import Product, Category, Order, OrderItem, ShippingAddress, Review, Payment

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
        fields = ('id', 'name', 'slug', 'image', 'products')  # all fields


# Payment serializer
class PaymentAllSerializer(serializers.ModelSerializer):

    #user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = ('__all__')  # all fields

# Payment serializer


class PaymentSerializer(serializers.ModelSerializer):

    #user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = ('_id', 'user', 'status', 'method', 'totalAmount',
                  'amountPaid', 'dateCreated', 'lastUpdated', )  # all fields


# Shipping Address serializer
class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'  # all fields


# Order Item serializer
class OrderItemSerializer(serializers.ModelSerializer):
    review = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('_id', 'name', 'qty', 'price',
                  'image', 'order', 'product', 'category', 'review')  # all fields

    def get_review(self, obj):
        review = obj.review_set.all()
        serializer = ReviewSerializer(review, many=True)
        return serializer.data


# Order  serializer - main serializer
class OrderSerializer(serializers.ModelSerializer):
    # order items, shippingAddress and user serializers will be retrieved and returned as a nested object in OrderSerializer

    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    payment = serializers.SerializerMethodField(read_only=True)
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

    # get payment data associated with order
    def get_payment(self, obj):
        # Payment information associated with order
        payment = obj.payment
        serializer = PaymentSerializer(payment, many=False)

        return serializer.data

    # get user data associated with order
    def get_user(self, obj):
        # User information associated with order
        user = obj.user
        serializer = UserSerializer(user, many=False)

        return serializer.data


class ReportEntrySerializer(serializers.Serializer):
    category = CategorySerializer()
    totalSales = serializers.DecimalField(max_digits=15, decimal_places=2)
    items = serializers.IntegerField()
    average = serializers.DecimalField(max_digits=15, decimal_places=2)


class MonthlySalesSerializer(serializers.Serializer):
    month = serializers.DateTimeField(read_only=True, format="%B")
    totalOrders = serializers.IntegerField()
    pendingOrders = serializers.IntegerField()
    shippedOrders = serializers.IntegerField()
    completedOrders = serializers.IntegerField()
    netSales = serializers.DecimalField(max_digits=15, decimal_places=2)
    avgSales = serializers.DecimalField(max_digits=15, decimal_places=2)


class OrdersTotalSerializer(serializers.Serializer):
    # order = OrderSerializer()
    total = serializers.IntegerField()
    pendingOrders = serializers.IntegerField()
    completedOrders = serializers.IntegerField()
