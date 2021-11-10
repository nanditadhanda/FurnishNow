# order_view.py - all order views

import stripe
from datetime import datetime
from base.serializers import PaymentSerializer, PaymentAllSerializer
from base.models import Payment
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

# import stripe

# stripe payment key
stripe.api_key = 'sk_test_51JouiJFWKt2oGMYrCH4MHhAv57SJbClJ73AQXkthmZiCbZDjMLVsAnJXVIJoBopelRv7DrghoBAcf8vUHBNIz8rc00jdLQR7Mi'

# payment test


@api_view(['POST'])
def createPaymentIntent(request):
    try:
        data = request.data
        amount = int(float(data['amount']) * 100)

        email = data['email']

        #-------- 1 stripe customer account / details --------#
        # checking if customer with provided email already exists
        customer_data = stripe.Customer.list(email=email).data

        # if the array is empty it means the email has not been used yet
        if len(customer_data) == 0:
            # creating customer
            customer = stripe.Customer.create(
                email=email)

        else:
            customer = customer_data[0]

        #-------- 2 Payment intent --------#
        intent = stripe.PaymentIntent.create(
            customer=customer,
            amount=amount,
            currency='myr',

            payment_method_types=['card', 'fpx', 'grabpay', 'alipay'],

        )
        return Response({
            'clientSecret': intent['client_secret'],
            'id': intent['id']
        })
    except Exception as e:
        return Response({'detail': str(e)},
                        status=status.HTTP_400_BAD_REQUEST)


# dispatched on submit


@api_view(['POST'])
@ permission_classes([IsAuthenticated])
def savePaymentInfo(request):
    data = request.data
    user = request.user
    paymentID = data['paymentID']

    # 1: Retrieve payment info from stripe using payment intent id
    stripePayment = stripe.PaymentIntent.retrieve(
        paymentID,
    )

    # 2: create new payment object in Payment model
    payment = Payment.objects.get_or_create(
        user=user,
        paymentID=paymentID,
        # method=stripePayment.payment_method_details.type,
        status=stripePayment.status,
        dateCreated=datetime.now(),
        lastUpdated=datetime.now(),
    )

    # 3 serialize
    serializer = PaymentSerializer(payment, many=False)

    return Response(serializer.data)

# update payment info


@api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def updatePaymentInfo(request):
    data = request.data
    user = request.user
    paymentID = data['paymentID']

    # 1: Retrieve payment info from stripe using payment intent id
    stripePayment = stripe.PaymentIntent.retrieve(
        paymentID,
    )

    # 2: get payment object in Payment model
    payment = Payment.objects.get(paymentID=paymentID)

    if(user == payment.user):
        # 3: update data

        if(data['payment_method']):
            payment.method = data['payment_method']

        if(stripePayment.status == 'succeeded'):
            # payment.method = stripePayment.payment_method_details.type
            paymentMethod = stripePayment.payment_method

            stripePaymentMethod = stripe.PaymentMethod.retrieve(
                paymentMethod,
            )

            payment.method = stripePaymentMethod.type

        payment.totalAmount = float(stripePayment.amount/100)
        payment.amountPaid = float(stripePayment.amount_received/100)
        payment.status = stripePayment.status
        payment.lastUpdated = datetime.now()

        payment.save()

        # 3 serialize
        serializer = PaymentSerializer(payment, many=False)

        return Response(serializer.data)

    else:
        return Response({'details': 'You are not authorized to update this payment information'})

# every time page is loaded


@api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getPaymentIntent(request):

    # user info
    user = request.user

    # data passed through parameters
    data = request.data
    #paymentIntent = data['paymentID']
    id = data['id']

    # check if authenticated user is accessing information
    try:
        # 1. get payment details from payment Model
        payment = Payment.objects.get(_id=id)

        # if user is a staff member or if the user passing the request is the same as the user who placed the order
        if user.is_staff or payment.user == user:
            serializer = PaymentAllSerializer(payment, many=False)

        # 2. get payment ID (payment intent in stripe)
            paymentIntent = serializer.data['paymentID']

        # 3. retrieve payment intent from stripe

            intent = stripe.PaymentIntent.retrieve(
                paymentIntent,
            )

            if(serializer.data['status'] != intent.status):
                print("status not the same.",
                      serializer.data['status'], " and ", intent.status)

            return Response(intent)

            # return Response(serializer.data)
        else:
            # else return error message
            return Response({'detail': 'Not authorized to view this payment information'},
                            status=status.HTTP_400_BAD_REQUEST)
    # throw exception
    except:
        return Response({'detail': 'Payment information does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    # get payment intent from stripe server

   # payment = stripe.PaymentIntent.retrieve(
   #     paymentIntent,
    # )

    # return Response(payment)
