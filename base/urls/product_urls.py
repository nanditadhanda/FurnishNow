# app URL paths and routing
from django.urls import path
from django.urls.resolvers import URLPattern

from base.views import product_views as views  # import all from views

# URL routes : path(URL, function, return value)
# product URLS
urlpatterns = [
    path('', views.getProducts, name="products"),
    path('<str:pk>', views.getProduct, name="product"),

    path('delete/<str:id>', views.deleteProduct, name="delete-product"),
]
