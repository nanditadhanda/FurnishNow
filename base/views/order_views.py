# order_view.py - all order views

from django.shortcuts import render

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status


#import models
from base.models import Product, Order, OrderItem, ShippingAddress
from accounts.models import User

# import serializers (models converted to JSON format)
from base.serializers import OrderSerializer


# decorators
@api_view(['POST'])  # POST request to add data to database
@permission_classes([IsAuthenticated])  # for authenticated users
# function based view
def addOrderItems(request):
    user = request.user
    data = request.data

    # data received from client side
    orderItems = data['orderItems']

    # if request is passed but no data is passed in request, return error response
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxRate=data['taxRate'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            state=data['shippingAddress']['state'],
            zipCode=data['shippingAddress']['zipCode'],
            country=data['shippingAddress']['country']
        )

        # (3) Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )

            # (4) Update stock value
            product.countInStock -= item.qty
            product.save()

    # convert data into JSON format using serializer
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
