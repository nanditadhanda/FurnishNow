# Generated by Django 3.2.6 on 2021-11-09 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0027_auto_20211107_1306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='paymentID',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
