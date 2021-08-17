# all admin panel controls

from django.contrib import admin
from .models import *  # import all models to create database tables


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'salePrice', 'countInStock')
    prepopulated_fields = {'slug': ('name',)}


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
# admin.site.register(Report)
