# order_view.py - all order views
from datetime import datetime
from base.serializers import OrderSerializer, PaymentSerializer
from accounts.models import User
from base.models import Payment, Product, Order, OrderItem, ShippingAddress
from django.shortcuts import render
from django.http import JsonResponse

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers, status


# import models

# import serializers (models converted to JSON format)

# import datetime library

# ----- Create New Order -------
@ api_view(['POST'])  # POST request to add data to database
@ permission_classes([IsAuthenticated])  # for authenticated users
# function based view
def addOrderItems(request):
    user = request.user
    data = request.data

    # data received from client side
    orderItems = data['orderItems']

    # get payment info
    payment = Payment.objects.get(_id=data['payment'])

    # if request is passed but no data is passed in request, return error response
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            payment=payment,
            taxRate=data['taxRate'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            name=data['shippingAddress']['name'],
            phone=data['shippingAddress']['phone'],
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

#----view to get all orders ---#


@ api_view(['GET'])
@ permission_classes([IsAdminUser])
def getOrders(request):
    # get all orders
    orders = Order.objects.all()

    # serialize order data
    serializer = OrderSerializer(orders, many=True)

    # return serialized data
    return Response(serializer.data)


#---- view to get user's orders ------ #
@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getMyOrders(request):
    # user data
    user = request.user

    # get all orders of logged in user
    orders = user.order_set.all()
    # serialize order data
    serializer = OrderSerializer(orders, many=True)
    # return serialized data
    return Response(serializer.data)


# ------View to get order --------
# decorators
@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    # user data comes from token passed in request
    user = request.user

    # retrieve order details and return to authorized user
    try:
        # get order data by id passed
        order = Order.objects.get(_id=pk)

        # if user is a staff member or if the user passing the request is the same as the user who placed the order
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            # else return error message
            return Response({'detail': 'Not authorized to view this order'},
                            status=status.HTTP_400_BAD_REQUEST)
    # throw exception
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# PUT request when payment is made
@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    # get order data by id passed
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paymentDate = datetime.now()
    order.lastUpdatedAt = datetime.now()
    order.save()

    return Response('Payment made successfully')


# PUT request to update order status
@ api_view(['PUT'])
@ permission_classes([IsAdminUser])
def updateOrderStatus(request, pk):

    # get order data by id passed
    order = Order.objects.get(_id=pk)

    data = request.data

    order.orderStatus = data['orderStatus']

    if(data['orderStatus'] == 'Delivered'):
        order.isDelivered = True
        order.deliveredAt = datetime.now()

    order.lastUpdatedAt = datetime.now()
    order.save()

    return Response('Order status updated')
