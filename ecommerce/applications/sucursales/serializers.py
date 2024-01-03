from rest_framework import serializers
from .models import Sucursal, Inventario

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    sucursal_nombre = serializers.ReadOnlyField(source='sucursal.nombre')
    producto_nombre = serializers.ReadOnlyField(source='productodetalle.producto.nombre')

    class Meta:
        model = Inventario
        fields = ['id', 'sucursal', 'sucursal_nombre', 'productodetalle', 'producto_nombre', 'cantidad']
