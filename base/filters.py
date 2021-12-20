# import django fitlers library
from django_filters.filters import CharFilter, MultipleChoiceFilter, RangeFilter, DateFromToRangeFilter
from accounts.models import User
from base.models import Product, Order
import django_filters
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from django_filters import rest_framework as filters

# import models


class MultipleParamsFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass


class ProductFilter(django_filters.FilterSet):
    price = django_filters.RangeFilter(field_name='salePrice')
    category = MultipleParamsFilter(
        field_name='category__slug', lookup_expr='in')

    rating = django_filters.RangeFilter(
        field_name='rating', lookup_expr='in')

    class Meta:
        model = Product
        fields = ['category', 'rating', 'price']


class OrderFilter(django_filters.FilterSet):
    date = DateFromToRangeFilter(field_name='orderDate')
    status = MultipleParamsFilter(
        field_name='orderStatus', lookup_expr='in')

    class Meta:
        model = Order
        fields = ['date', 'status']
