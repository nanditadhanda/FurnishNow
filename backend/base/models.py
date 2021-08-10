# Models are classes used to create database tables
from django.db import models
from accounts.models import User

# Superadmin overwrite

# class systemAdmin(BaseUserManager):
#     def create_user(self, first_name, last_name, username, email, password=None):

#         #validations - error messages
#         if not email:
#             raise ValueError("Email address is required")

#         if not username:
#             raise ValueError('Username is required')

#         user = self.model(
#             email = self.normalize_email(email),
#             username = username,
#             first_name = first_name,
#             last_name = last_name,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, first_name, last_name, email, username, password):
#         user = self.create_user(
#             email = self.normalize_email(email),
#             username = username,
#             password = password,
#             first_name = first_name,
#             last_name = last_name,
#         )

#         #superadmin has all permission set to true
#         user.is_active = True
#         user.is_storemanager = True
#         user.is_systemadmin = True
#         user.save(using=self._db)
#         return user

# #overwire django User model
# class User(AbstractBaseUser):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     username = models.CharField(max_length=100, unique=True)
#     email = models.EmailField(unique=True)
#     phone_number = models.CharField(max_length=50)

#     #custom fields
#     date_joined = models.DateTimeField(auto_now_add=True)
#     last_login = models.DateTimeField(auto_now_add=True)
#     is_storemanager = models.BooleanField(default=False)
#     is_systemadmin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     #required fields
#     # USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username', 'email', 'first_name', 'last_name']

#     def __str__(self):
#         return self.username

#     #call systemAdmin class
#     objects = systemAdmin()

#     #mandatory methods
#     def has_perm(self, perm, obj=None):
#         return self.is_systemadmin

#     def has_module_perms(self, add_labels):
#         return True


# Product model (database table)
class Product(models.Model):
    #user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    # image3D =
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    costPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    salePrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    userID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    reviewDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


# order table
class Order(models.Model):
    userID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxRate = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paymentDate = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    orderStatus = models.CharField(max_length=200, null=True, blank=True)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    orderDate = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.orderDate)


# single item table
class OrderItem(models.Model):
    orderID = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    productID = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


# shipping address table
class ShippingAddress(models.Model):
    orderID = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


# report table
