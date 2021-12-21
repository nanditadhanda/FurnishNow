# Models are classes used to create database tables.
# Attributes defined in each class will be the fields of the database table

from django.db import models

# import custom User model
from accounts.models import User

# import utility for form choices
from django.utils.translation import gettext_lazy as _

# timezone
from django.utils import timezone


# category model
class Category(models.Model):
    # fields and attributes
    name = models.CharField(max_length=200, null=False,
                            blank=False, unique=True)
    slug = models.CharField(max_length=100, unique=True, null=False)
    image = models.ImageField(
        upload_to='images/categories', null=False, blank=False, default='/images/categories/placeholder.jpg')
    # _id = models.AutoField(primary_key=True, editable=False)

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
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    slug = models.CharField(
        max_length=100, unique=False, null=False, blank=True)
    image = models.ImageField(
        upload_to='images/products', null=True, blank=True, default='/images/products/placeholder.jpg')
    model3D = models.FileField(
        upload_to='models', null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_DEFAULT, null=True, related_name="products", default=5)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    costPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    salePrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return self.name


class Payment(models.Model):
    #fields and attributes
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentID = models.CharField(
        max_length=200, null=False, blank=False, unique=True)
    totalAmount = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    amountPaid = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    method = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True)
    dateCreated = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    lastUpdated = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)


# order table
class Order(models.Model):
    # subclass - order status
    class orderStatusChoices(models.TextChoices):
        PLACED = 'Placed', _('Placed')
        PACKAGED = 'Packaged', _('Packaged')
        SHIPPED = 'Shipped', _('Shipped Out')
        DELIVERED = 'Delivered', _('Delivered')

    # fields and attributes
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, null=True)
    taxRate = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    orderStatus = models.CharField(
        max_length=20, choices=orderStatusChoices.choices, default=orderStatusChoices.PLACED)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    lastUpdatedAt = models.DateTimeField(
        default=timezone.now, null=True, blank=True, editable=True)
    orderDate = models.DateTimeField(default=timezone.now)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return str(self.orderDate)

# single item table


class OrderItem(models.Model):
    # fields and attributes
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(
        Category, blank=False, on_delete=models.SET_DEFAULT, default='5')
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return str(self.name)

# review table


class Review(models.Model):
    # fields and attributes
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    orderItem = models.ForeignKey(
        OrderItem, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    reviewDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # string method
    def __str__(self):
        return str(self.rating)


# shipping address table
class ShippingAddress(models.Model):
    # fields and attributes
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    zipCode = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    # fix plural form in django admin panel

    class Meta:
        verbose_name = 'address'
        verbose_name_plural = 'addresses'

    # string method
    def __str__(self):
        return str(self.address)
