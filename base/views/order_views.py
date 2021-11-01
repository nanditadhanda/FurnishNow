# order_view.py - all order views

from django.shortcuts import render

# import decorator from django-rest-framework
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers, status


# import models
from base.models import Product, Order, OrderItem, ShippingAddress
from accounts.models import User

# import serializers (models converted to JSON format)
from base.serializers import OrderSerializer

# import datetime library
from datetime import datetime

# import stripe
import stripe

# stripe payment key
stripe.api_key = 'sk_test_51JouiJFWKt2oGMYrCH4MHhAv57SJbClJ73AQXkthmZiCbZDjMLVsAnJXVIJoBopelRv7DrghoBAcf8vUHBNIz8rc00jdLQR7Mi'

# payment test


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='myr',
        payment_method_types=['grabpay'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


# save payment info to stripe
@api_view(['POST'])
@ permission_classes([IsAuthenticated])
def save_stripe_info(request):
    # check user datails passed in request
    user = request.user
    # check data passed into request
    data = request.data

    amount = int(float(data['amount']) * 100)

    # set variables
    email = data['email']
    payment_method_id = data['payment_method_id']

    #-------- 1 stripe customer account / details --------#
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    # if the array is empty it means the email has not been used yet
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)

    else:
        customer = customer_data[0]

    #-------- 2 Payment intent --------#
    payment = stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency='myr',
        amount=amount,
        confirm=True
    )

    print(payment)
    return Response(status=status.HTTP_200_OK,
                    data={
                        'data': {
                            'customer_id': customer.id,
                            'payment_id': payment.id,
                            'status': payment.status
                        }
                    })

# ----- Create New Order -------


@ api_view(['POST'])  # POST request to add data to database
@ permission_classes([IsAuthenticated])  # for authenticated users
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
            isPaid=True,
            paymentDate=datetime.now(),
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
