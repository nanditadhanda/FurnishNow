# app URL paths and routing
from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern

from base.views import order_views as views  # import all from views

# URL routes : path(URL, function, return value)
# order URLS
urlpatterns = [

    url(r'^payment/test-payment/$', views.test_payment),
    # url(r'^payment/payment-intent/$', views.createIntent),
    url(r'^payment/save-stripe-info/$', views.save_stripe_info),


    path('payment/create-payment-intent/',
         views.createPayment, name="create-payment-intent"),



    path('', views.getOrders, name='orders'),

    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders', views.getMyOrders, name='myorders'),

    path('<str:pk>/status', views.updateOrderStatus, name='order-status'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/payment', views.updateOrderToPaid, name='payment'),

]
