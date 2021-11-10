# app URL paths and routing
from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern

from base.views import payment_views as views  # import all from views

# URL routes : path(URL, function, return value)
# order URLS
urlpatterns = [

    url(r'^create-payment-intent/$', views.createPaymentIntent),

    path('save-payment-info/', views.savePaymentInfo, name="save_payment"),
    path('update-payment-info/', views.updatePaymentInfo,
         name="update-payment-info"),
    path('get-payment', views.getPaymentIntent, name="get-payment"),
]
