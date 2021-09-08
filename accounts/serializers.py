# serializers will retrieve data from database and return it in JSON format (Django REST api)

# import django_rest framework serializer module
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# import models
from .models import User


# user serializer
class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isStoreManager = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('_id', 'username', 'email', 'name', 'isStoreManager')

    # method to create custom attributes based on user data
    #   - self is the serializer and obj is the user object

    # set id as _id
    def get__id(self, obj):
        return obj.id

    # set user's first name as 'name'

    def get_name(self, obj):
        name = obj.first_name + " " + obj.last_name
        if name == '':
            name = obj.email

        return name

    def get_isStoreManager(self, obj):
        isStoreManager = obj.is_staff
        return isStoreManager

# extend UserSerializer


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User  # model from database
        fields = ('_id', 'first_name', 'last_name', 'username',
                  'email', 'isStoreManager', 'token')

    # token method
    def get_token(self, obj):

        # token is set to Refresh token of the user object
        token = RefreshToken.for_user(obj)

        # return string value of token
        return str(token)
