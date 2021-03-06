# Generated by Django 3.2.6 on 2021-09-14 20:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0003_auto_20210817_0818'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='userID',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='orderID',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='productID',
        ),
        migrations.RemoveField(
            model_name='review',
            name='productID',
        ),
        migrations.RemoveField(
            model_name='review',
            name='userID',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='orderID',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='postalCode',
        ),
        migrations.AddField(
            model_name='order',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
        migrations.AddField(
            model_name='review',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
        migrations.AddField(
            model_name='review',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='order',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order'),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='state',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='zipCode',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
