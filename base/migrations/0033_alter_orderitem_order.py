# Generated by Django 3.2.6 on 2021-12-19 16:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0032_orderitem_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order'),
        ),
    ]
