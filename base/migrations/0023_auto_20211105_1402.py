# Generated by Django 3.1.4 on 2021-11-05 06:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0022_auto_20211105_1400'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='amountPaid',
            new_name='amount',
        ),
    ]
