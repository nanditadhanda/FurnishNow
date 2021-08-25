# app URL paths and routing

from django.urls import path
from django.urls.resolvers import URLPattern

from . import views  # import all from views

# URL routes : path(URL, function, return value)
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    path('categories/', views.getCategories, name="categories"),
    path('categories/<str:category_slug>', views.getCategory, name="category"),
]
