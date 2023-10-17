from rest_framework import viewsets
from .models import Orden, Transacción, Factura, TipoPago, CarritoProductoDetalle, Carrito
from .serializers import OrdenSerializer, TransacciónSerializer, FacturaSerializer, TipoPagoSerializer, CarritoSerializer, CarritoProductoDetalleSerializer

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

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
