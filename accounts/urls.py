# app URL paths and routing

from django.urls import path
from django.urls.resolvers import URLPattern

from . import views  # import all from accounts.views


# URL routes : path(URL, function, return value)
urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser,
         name='register'),

    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('', views.getUsers, name="users"),
    path('<str:id>', views.getUserByID, name="user-account"),


    path('update/<str:id>', views.adminUpdateUser, name="admin-update-user"),

    path('delete/<str:id>', views.deleteUser, name="delete-user"),
]
