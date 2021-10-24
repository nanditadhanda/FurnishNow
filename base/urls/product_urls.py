# app URL paths and routing
from django.urls import path
from django.urls.resolvers import URLPattern

from base.views import product_views as views  # import all from views

# URL routes : path(URL, function, return value)
# product URLS
urlpatterns = [

    path('', views.getProducts, name="products"),


    path('create', views.createProduct, name="create-product"),
    path('upload-image', views.uploadProductImage, name="upload-image"),

    path('<str:id>/review', views.createProductReview, name="product-review"),
    path('<str:pk>', views.getProduct, name="product"),

    path('update/<str:id>', views.updateProduct, name="update-product"),
    path('delete/<str:id>', views.deleteProduct, name="delete-product"),


]
