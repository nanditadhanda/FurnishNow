# app URL paths and routing
from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern

from base.views import report_views as views  # import all from views

# URL routes : path(URL, function, return value)
# order URLS
urlpatterns = [
    path('category_sales', views.categorySalesReport, name='transaction'),
    path('daily_sales', views.dailySalesReport, name='daily-sales'),
    path('orders_total', views.ordersTotalReport, name='orders-total')
]
