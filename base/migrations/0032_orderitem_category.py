# Generated by Django 3.2.6 on 2021-12-19 16:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0031_alter_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='category',
            field=models.ForeignKey(default='5', on_delete=django.db.models.deletion.SET_DEFAULT, to='base.category'),
        ),
    ]
