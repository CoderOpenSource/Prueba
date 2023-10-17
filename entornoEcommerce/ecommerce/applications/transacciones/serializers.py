from rest_framework import serializers
from .models import Orden, Transacción, Factura, TipoPago, Carrito, CarritoProductoDetalle, OrdenProductoDetalle
from ..productos.models import ProductoDetalle
from ..productos.serializers import ProductoDetalleSerializer
from django.db import transaction

from ..usuarios.serializers import UsuarioSerializer
class OrdenProductoDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenProductoDetalle
        fields = ('productodetalle', 'cantidad')


from rest_framework import serializers
from .models import Orden, OrdenProductoDetalle


class OrdenProductoDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenProductoDetalle
        fields = ('productodetalle', 'cantidad')


class OrdenSerializer(serializers.ModelSerializer):
    productos = OrdenProductoDetalleSerializer(source='ordenproductodetalle_set', many=True, write_only=True)
    usuario_detail = UsuarioSerializer(source='usuario', read_only=True)  # Nueva línea
    class Meta:
        model = Orden
        fields = ('id', 'usuario', 'usuario_detail', 'estado', 'fecha_creacion', 'productos')  # Ajustado a plural 'productos'

    def create(self, validated_data):
        productos_data = validated_data.pop('ordenproductodetalle_set',
                                            None)  # extraer y eliminar 'ordenproductodetalle_set' de validated_data

        # Como 'ordenproductodetalle_set' ha sido eliminado, ahora puedes crear una Orden sin recibir un TypeError
        orden = Orden.objects.create(**validated_data)

        if productos_data:
            for producto_data in productos_data:
                OrdenProductoDetalle.objects.create(orden=orden, **producto_data)

        return orden


class TransacciónSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacción
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'

class TipoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPago
        fields = '__all__'


class CarritoProductoDetalleSerializer(serializers.ModelSerializer):
    productodetalle_id = serializers.PrimaryKeyRelatedField(source='productodetalle', queryset=ProductoDetalle.objects.all())  # Renombrado a productodetalle_id
    productodetalle_detail = serializers.SerializerMethodField()  # Nuevo campo para los detalles

    class Meta:
        model = CarritoProductoDetalle
        fields = '__all__'  # Asegúrese de que los nuevos campos estén incluidos si está utilizando '__all__'

    def get_productodetalle_detail(self, obj):
        """ Retorna los detalles serializados de ProductoDetalle """
        if obj.productodetalle:
            return ProductoDetalleSerializer(obj.productodetalle).data
        return None

class CarritoSerializer(serializers.ModelSerializer):
    productos_detalle = CarritoProductoDetalleSerializer(source='carritoproductodetalle_set', many=True, required=False)

    class Meta:
        model = Carrito
        fields = '__all__'


    @transaction.atomic  # Asegura que todo dentro de este método sea una transacción única
    def create(self, validated_data):
        productos_detalle_data = validated_data.pop('productos_detalle', None)  # Manejar si productos_detalle es None

        # Crear Carrito primero para obtener un ID
        carrito = Carrito.objects.create(**validated_data)

        # Si hay datos de productos_detalle, entonces los creamos
        if productos_detalle_data:
            for producto_detalle_data in productos_detalle_data:
                CarritoProductoDetalle.objects.create(carrito=carrito, **producto_detalle_data)

        return carrito

    def update(self, instance, validated_data):
        productos_detalle_data = validated_data.pop('productos_detalle', [])
        instance = super().update(instance, validated_data)

        # Añadiendo o actualizando productos
        for producto_detalle_data in productos_detalle_data:
            producto_id = producto_detalle_data.get('productodetalle').id
            cantidad = producto_detalle_data.get('cantidad')

            # Buscar si el producto ya está en el carrito
            carrito_producto_detalle, created = CarritoProductoDetalle.objects.get_or_create(
                carrito=instance,
                productodetalle_id=producto_id,
                defaults={'cantidad': cantidad}
            )

            # Si el producto ya estaba en el carrito, actualizar la cantidad
            if not created:
                carrito_producto_detalle.cantidad += cantidad
                carrito_producto_detalle.save()

        return instance