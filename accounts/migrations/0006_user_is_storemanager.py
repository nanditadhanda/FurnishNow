# Generated by Django 3.2.6 on 2021-11-09 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_storeManager',
            field=models.BooleanField(default=False),
        ),
    ]
