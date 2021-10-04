# all admin panel controls

from django.contrib import admin
from .models import *  # import all models to create database tables


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'salePrice', 'countInStock')
    prepopulated_fields = {'slug': ('name',)}

    # readonly fields
   # readonly_fields = ('user',)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('_id', 'orderDate', 'totalPrice',
                    'orderStatus')
    # readonly fields
    readonly_fields = ('user', 'orderDate', 'lastUpdatedAt')


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'name', 'qty',
                    'price')

    # readonly fields
    readonly_fields = ('order',)


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress)
# admin.site.register(Report)
