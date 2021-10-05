# app URL paths and routing
from django.urls import path
from django.urls.resolvers import URLPattern

from base.views import order_views as views  # import all from views

# URL routes : path(URL, function, return value)
# order URLS
urlpatterns = [
    path('', views.getOrders, name='orders'),

    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders', views.getMyOrders, name='myorders'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/payment', views.updateOrderToPaid, name='payment'),
]
