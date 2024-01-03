from rest_framework import serializers
from .models import Orden, Transacción, Factura, TipoPago, Carrito, CarritoProductoDetalle, OrdenProductoDetalle
from ..productos.models import ProductoDetalle
from ..productos.serializers import ProductoDetalleSerializer
from django.db import transaction
from ..sucursales.models import Inventario
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

from django.db import transaction
from django.db.models import F
from django.core.exceptions import ValidationError

class CarritoSerializer(serializers.ModelSerializer):
    productos_detalle = CarritoProductoDetalleSerializer(source='carritoproductodetalle_set', many=True, required=False)

    class Meta:
        model = Carrito
        fields = '__all__'

    @transaction.atomic  # Asegura que todo dentro de este método sea una transacción única
    def create(self, validated_data):
        print(validated_data)
        print("Creating cart...")
        productos_detalle_data = validated_data.pop('productos_detalle', None)
        carrito = Carrito.objects.create(**validated_data)
        print(f"productos_detalle_data: {productos_detalle_data}")

        if productos_detalle_data:
            for producto_detalle_data in productos_detalle_data:
                producto = ProductoDetalle.objects.get(id=producto_detalle_data['productodetalle'].id)
                inventario = Inventario.objects.get(productodetalle=producto)

                # Verificar si hay suficiente inventario antes de crear
                if inventario.cantidad < producto_detalle_data['cantidad']:
                    raise ValidationError('Inventario insuficiente')

                # Crear el detalle del carrito
                CarritoProductoDetalle.objects.create(carrito=carrito, **producto_detalle_data)

                print(f"Producto Detalle ID: {producto_detalle_data['productodetalle'].id}")
                print(f"Cantidad a Descontar: {producto_detalle_data['cantidad']}")
                print(f"Inventario Antes: {inventario.cantidad}")

                # Descontar del inventario
                inventario.cantidad -= producto_detalle_data['cantidad']
                inventario.save()

                print(f"Inventario Después: {inventario.cantidad}")

        return carrito

    from django.core.exceptions import ValidationError

    def update(self, instance, validated_data):
        if 'disponible' in validated_data and len(validated_data) == 1:
            instance.disponible = validated_data.get('disponible')
            instance.save()
            return instance
        related_data = self.context['request'].data.get('carritoproductodetalle_set', [])
        with transaction.atomic():
            # Actualizar el carrito
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()

            existing_items = {item.id: item for item in instance.carritoproductodetalle_set.all()}

            # Procesar cada item en los datos recibidos
            for item_data in related_data:
                item_id = item_data.pop('id', None)
                producto_detalle_id = item_data.get('productodetalle')

                producto_detalle_instance = ProductoDetalle.objects.get(id=producto_detalle_id)
                item_data['productodetalle'] = producto_detalle_instance

                inventario = Inventario.objects.filter(productodetalle=producto_detalle_instance).first()

                if item_id:  # Actualizando un item existente
                    item = existing_items.pop(item_id)
                    cantidad_diferencia = item_data['cantidad'] - item.cantidad

                    # Verificar inventario
                    if inventario.cantidad < cantidad_diferencia:
                        raise ValidationError('Inventario insuficiente')

                    # Actualizar item
                    for attr, value in item_data.items():
                        # Asumiendo que value es el ID del Carrito que quieres asignar
                        if attr == 'carrito':
                            value = Carrito.objects.get(id=value)  # Obtener la instancia de Carrito basada en el ID

                        setattr(item, attr, value)
                    item.save()

                    # Actualizar inventario
                    inventario.cantidad -= cantidad_diferencia
                else:  # Creando un nuevo item
                    if inventario.cantidad < item_data['cantidad']:
                        raise ValidationError('Inventario insuficiente')

                    # Crear item
                    CarritoProductoDetalle.objects.create(carrito=instance, **item_data)

                    # Actualizar inventario
                    inventario.cantidad -= item_data['cantidad']

                inventario.save()

            # Eliminar items que no están en los datos recibidos y restaurar inventario
            for item in existing_items.values():
                inventario = Inventario.objects.filter(productodetalle=item.productodetalle).first()
                inventario.cantidad += item.cantidad
                inventario.save()
                item.delete()

        return instance
