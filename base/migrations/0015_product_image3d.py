# Generated by Django 3.2.6 on 2021-10-14 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_alter_order_orderstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image3D',
            field=models.FileField(blank=True, null=True, upload_to='images/3DModels'),
        ),
    ]