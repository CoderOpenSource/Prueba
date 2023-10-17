# Generated by Django 4.2.5 on 2023-10-17 03:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('productos', '0007_remove_productodetalle_estado'),
        ('reservas', '0002_reserva_expirado'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='reserva',
            unique_together={('usuario', 'producto_detalle')},
        ),
    ]