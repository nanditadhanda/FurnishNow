# app URL paths and routing
from django.urls import path
from django.urls.resolvers import URLPattern

from base.views import product_views as views  # import all from views

# URL routes : path(URL, function, return value)
# product URLS
urlpatterns = [

    path('', views.getProducts, name="products"),


    path('create', views.createProduct, name="create-product"),
    path('upload-file', views.uploadProductFile, name="upload-product-file"),

    path('<str:id>/review', views.createProductReview, name="product-review"),
    path('top-rated', views.getTopProducts, name="top-products"),
    path('<str:pk>', views.getProduct, name="product"),

    path('update/<str:id>', views.updateProduct, name="update-product"),
    path('delete/<str:id>', views.deleteProduct, name="delete-product"),


]
