# Generated by Django 3.1.4 on 2021-11-05 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_auto_20211103_0229'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentID', models.CharField(max_length=200)),
                ('amountPaid', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('method', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.CharField(blank=True, max_length=200, null=True)),
                ('date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]