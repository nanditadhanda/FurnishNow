# app URL paths and routing
from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern

from base.views import report_views as views  # import all from views

# URL routes : path(URL, function, return value)
# order URLS
urlpatterns = [
    path('category_sales', views.categorySalesReport, name='transaction'),
    path('monthly_sales', views.monthlySalesReport, name='monthly-sales'),
    path('orders_total', views.ordersTotalReport, name='orders-total')
]
