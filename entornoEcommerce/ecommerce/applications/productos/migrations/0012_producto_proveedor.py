# Generated by Django 4.2.5 on 2023-11-21 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0011_productodetalle_proveedor'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='proveedor',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]