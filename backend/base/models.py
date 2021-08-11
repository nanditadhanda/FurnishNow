# Models are classes used to create database tables
from django.db import models

# import custom User model
from accounts.models import User


# category model
class Category(models.Model):
    # fields and attributes
    name = models.CharField(max_length=200, null=True, blank=True, unique=True)
    image = models.ImageField(null=True, blank=True)
    slug = models.CharField(max_length=100, unique=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # fix plural form in django admin panel
    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    # string method
    def __str__(self):
        return self.name


# Product model (database table)
class Product(models.Model):
    # fields and attributes

    #user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    # image3D =
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
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

    # string method
    def __str__(self):
        return self.name


# review table
class Review(models.Model):
    # fields and attributes
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    userID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    reviewDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return str(self.rating)


# order table
class Order(models.Model):
    # fields and attributes
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

    # string method
    def __str__(self):
        return str(self.orderDate)


# single item table
class OrderItem(models.Model):
    # fields and attributes
    orderID = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return str(self.name)


# shipping address table
class ShippingAddress(models.Model):
    # fields and attributes
    orderID = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # fix plural form in django admin panel

    class Meta:
        verbose_name = 'address'
        verbose_name_plural = 'addresses'

    # string method
    def __str__(self):
        return str(self.address)


# report table
