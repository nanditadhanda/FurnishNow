from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from .models import User


# customize User panel in dashboard
class AccountAdmin(UserAdmin):
    # displayed on table in dashboard
    list_display = ('first_name', 'last_name', 'email',
                    'username', 'last_login', 'date_joined', 'is_active')

    # clickable links
    list_display_links = ('email', 'username', 'first_name',  'last_name')

    # readonly fields
    readonly_fields = ('last_login', 'date_joined')

    # sorting order
    ordering = ('date_joined',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


# Register models.
admin.site.register(User, AccountAdmin)
