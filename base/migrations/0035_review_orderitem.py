# Generated by Django 3.2.6 on 2021-12-21 19:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0034_auto_20211221_2215'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='orderItem',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='review', to='base.orderitem'),
        ),
    ]
