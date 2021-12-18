# app URL paths and routing

from django.urls import path
from django.urls.resolvers import URLPattern

from base.views import category_views as views  # import all from views

# URL routes : path(URL, function, return value)
urlpatterns = [
    path('', views.getCategories, name="categories"),


    path('create', views.createCategory, name="create-category"),

    path('<str:slug>', views.getCategory, name="category"),

    path('update/<str:id>', views.updateCategory, name="update-category"),
    path('delete/<str:id>', views.deleteCategory, name="delete-category"),
]
