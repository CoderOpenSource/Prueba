from rest_framework import serializers
from .models import Reserva
from ..sucursales.models import Inventario  # Asegúrate de importar correctamente

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'

    def to_representation(self, instance):
        # Chequea si la reserva ha expirado al ser representada
        instance.delete_if_expired()
        return super(ReservaSerializer, self).to_representation(instance)

    def validate(self, data):
        usuario = data.get('usuario')
        producto_detalle = data.get('producto_detalle')
        cantidad_deseada = data.get('cantidad')

        # Verifica que no exista una reserva previa para el mismo producto
        exists = Reserva.objects.filter(usuario=usuario, producto_detalle=producto_detalle).exists()
        if exists:
            raise serializers.ValidationError("Ya has reservado este producto.")

        # Obtiene el inventario basado en el producto_detalle
        try:
            inventario = Inventario.objects.get(productodetalle=producto_detalle)
        except Inventario.DoesNotExist:
            raise serializers.ValidationError("Inventario no encontrado para el producto seleccionado.")

        # Verifica que la cantidad deseada esté disponible
        if inventario.cantidad < cantidad_deseada:
            raise serializers.ValidationError("No hay suficiente inventario disponible.")

        return data
