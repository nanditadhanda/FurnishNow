from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Models are classes used to create database tables

# Product model (database table)


class Product(models.Model):
    #user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    # image =
    # image3D =
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
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
