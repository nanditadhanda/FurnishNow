# accounts/views.py - user account views

# Django imports
from django.shortcuts import render
from django.http import JsonResponse

# JSON Web token imports
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# import views from django-rest-framework
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

#import models
from .models import User

# import serializers (models converted to JSON format)
from .serializers import UserSerializer, UserSerializerWithToken

# imports required to register new users
from django.contrib.auth.hashers import make_password  # to encrypt passwords
# to print error message based on status of request
from rest_framework import status


# user view
@api_view(['GET'])  # GET REST api method
# can only access if authorization token is provided
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    # get user information from user token
    #   - normally the request method would give the data of the logged in authenticated usersource
    #   - but since this project is using django rest api and we are using JWT tokens to authenticate users, the request method will return data from the token

    user = request.user

    # serialize into JSON format
    serializer = UserSerializer(user, many=False)

    # return serialized data
    return Response(serializer.data)


# update user
@api_view(['PUT'])  # PUT REST api method to update data
# can only access if authorization token is provided
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    user = request.user

    # serialize into JSON format
    serializer = UserSerializerWithToken(user, many=False)

    # get data passed
    data = request.data

    # update existing user data with new data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']
    user.phone_number = data['phone_number']
    # if password value changed then update password
    if data['password'] != '':
        user.password = make_password(data['password'])

    # save user info
    user.save()

    # return serialized data
    return Response(serializer.data)

    # POST request to register new user


@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerStaffUser(request):
    # data from request passed
    data = request.data

    print(data['email'])

    # try exception
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=make_password(data['password']),
            is_staff=data['isSystemAdmin'],
            is_admin=data['isSystemAdmin'],
            is_storeManager=data['isStoreManager'],

        )
        # serialize data in JSON format
        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    # exception
    except:
        # error message dictionary
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])  # PUT REST api method to update data
# can only access if authorization token is provided
@permission_classes([IsAdminUser])
def adminUpdateUser(request, id):

    user = User.objects.get(id=id)

    # get data passed
    data = request.data

    if(data['is_active'] != ''):
        user.is_active = data['is_active']
    else:
        # update existing user data with new data
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.username = data['email']
        user.email = data['email']
        user.phone_number = data['phone_number']
        user.is_staff = data['isSystemAdmin']
        user.is_admin = data['isSystemAdmin']
        user.is_storeManager = data['isStoreManager']

    # save user info
    user.save()

    # serialize into JSON format
    serializer = UserSerializer(user, many=False)

    # return serialized data
    return Response(serializer.data)


# GET request to retrieve ALL user data (only for admin user)
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # only admin user can access
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Get single user by ID


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # only admin user can access
def getUserByID(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        return Response({'detail': 'User with given user ID does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# extend default TokenObtainPairSerializer with custom class
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data recieved from post request sent into user serializer
        serializer = UserSerializerWithToken(self.user).data

        # loop through data in serializer
        for key, value in serializer.items():
            # for each item in the serializer, set the data key to the value assigned
            data[key] = value

        # return the values in the data array.
        return data


# to log in
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# POST request to register new user
@api_view(['POST'])
def registerUser(request):
    # data from request passed
    data = request.data

    # try exception
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            phone_number=data['phone'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    # exception
    except:
        # error message dictionary
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Delete user view
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, id):
    userToDelete = User.objects.get(id=id)
    userToDelete.delete()
    return Response('User account has been deleted')
