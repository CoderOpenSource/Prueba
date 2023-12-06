
# Create your models here.
from django.db import models
from ..productos.models import ProductoDetalle


class Sucursal(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15)
    latitud = models.FloatField()  # Campo para la latitud
    longitud = models.FloatField()
def __str__(self):
        return self.nombre


class Inventario(models.Model):
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    productodetalle = models.ForeignKey(ProductoDetalle, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.sucursal.nombre} - {self.productodetalle.producto.nombre} - {self.cantidad}"


@classmethod
def buscar_producto_en_sucursales(codigo_producto, sucursal_actual_id):
    inventarios = Inventario.objects.filter(
        productodetalle__codigo=codigo_producto,
        cantidad__gt=0
    ).exclude(sucursal__id=sucursal_actual_id)

    if inventarios.exists():
        sucursales_disponibles = [inventario.sucursal for inventario in inventarios]
        return sucursales_disponibles
    else:
        return None