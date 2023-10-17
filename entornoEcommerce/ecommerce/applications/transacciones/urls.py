from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrdenViewSet, TransacciónViewSet, FacturaViewSet, TipoPagoViewSet, CarritoViewSet, CarritoProductoDetalleViewSet

router = DefaultRouter()
router.register(r'ordenes', OrdenViewSet)
router.register(r'transacciones', TransacciónViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'tipos_pago', TipoPagoViewSet)
router.register(r'carritos', CarritoViewSet)
router.register(r'carrito_detalle', CarritoProductoDetalleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
