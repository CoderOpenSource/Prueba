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
        inventarios = Inventario.objects.filter(productodetalle=producto_detalle)
        if not inventarios:
            raise serializers.ValidationError("Inventario no encontrado para el producto seleccionado.")

        # Si hay más de un inventario, debes decidir cómo manejarlo.
        # Por ejemplo, podrías sumar la cantidad disponible si tu lógica de negocio lo permite.
        cantidad_disponible = sum(inventario.cantidad for inventario in inventarios)
        if cantidad_disponible < cantidad_deseada:
            raise serializers.ValidationError("No hay suficiente inventario disponible.")

        return data

