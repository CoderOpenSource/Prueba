from rest_framework import viewsets, status
from .models import Orden, Transacción, Factura, TipoPago, CarritoProductoDetalle, Carrito
from ..sucursales.models import Inventario
from .serializers import OrdenSerializer, TransacciónSerializer, FacturaSerializer, TipoPagoSerializer, CarritoSerializer, CarritoProductoDetalleSerializer
from rest_framework.response import Response
from django.db import transaction
class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer

class TransacciónViewSet(viewsets.ModelViewSet):
    queryset = Transacción.objects.all()
    serializer_class = TransacciónSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer

class TipoPagoViewSet(viewsets.ModelViewSet):
    queryset = TipoPago.objects.all()
    serializer_class = TipoPagoSerializer


class CarritoProductoDetalleViewSet(viewsets.ModelViewSet):
    queryset = CarritoProductoDetalle.objects.all()
    serializer_class = CarritoProductoDetalleSerializer

class CarritoProductoDetalleViewSet(viewsets.ModelViewSet):
    queryset = CarritoProductoDetalle.objects.all()
    serializer_class = CarritoProductoDetalleSerializer

    @transaction.atomic
    def perform_create(self, serializer):
        print("Inicio perform_create")
        carrito_producto_detalle = serializer.save()
        print("CarritoProductoDetalle guardado:", carrito_producto_detalle)

        # Obtén el ProductoDetalle asociado
        producto_detalle = carrito_producto_detalle.productodetalle
        print("ProductoDetalle asociado:", producto_detalle)

        # Obtén el inventario asociado con el ProductoDetalle
        inventario = Inventario.objects.filter(productodetalle=producto_detalle).first()
        print("Inventario antes:", inventario.cantidad)

        # Verifica si hay suficiente stock disponible
        if inventario.cantidad < carrito_producto_detalle.cantidad:
            # Si no hay suficiente, elimina el CarritoProductoDetalle que se acaba de crear
            carrito_producto_detalle.delete()
            print("Inventario insuficiente, CarritoProductoDetalle eliminado")
            raise serializers.ValidationError('Inventario insuficiente')

        # Reduce la cantidad en el inventario y guarda
        inventario.cantidad -= carrito_producto_detalle.cantidad
        inventario.save()
        print("Inventario después:", inventario.cantidad)
from rest_framework import viewsets, response

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer

    def create(self, request, *args, **kwargs):
        print("Datos recibidos en crudo: ")
        print(request.body.decode("utf-8"))  # imprimir el cuerpo de la solicitud raw

        # Llamar al método create original para continuar con el proceso de creación
        return super(CarritoViewSet, self).create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        print("Raw data received: ")
        print(request.body.decode("utf-8"))  # imprimir el cuerpo de la solicitud raw

        # Llamar al método update original para continuar con el proceso de actualización
        return super(CarritoViewSet, self).update(request, *args, **kwargs)
