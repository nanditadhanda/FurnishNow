# Models are classes used to create database tables
from django.db import models
from django.contrib.auth.models import User


# Product model (database table)
class Product(models.Model):
    #user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    # image3D =
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    costPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    salePrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    userID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    reviewDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


# order table
class Order(models.Model):
    userID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxRate = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paymentDate = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    orderStatus = models.CharField(max_length=200, null=True, blank=True)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    orderDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.orderDate)


# single item table
class OrderItem(models.Model):
    orderID = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


# shipping address table
class ShippingAddress(models.Model):
    orderID = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


# report table
