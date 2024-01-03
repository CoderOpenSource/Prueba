from django.db import models
from ..usuarios.models import Usuario  # Asegúrate de importar correctamente el modelo Usuario
from ..productos.models import ProductoDetalle  # Asegúrate de importar correctamente el modelo ProductoDetalle


ESTADOS_POSIBLES = [
    ('pendiente', 'Pendiente'),
    ('procesando', 'Procesando'),
    ('enviado', 'Enviado'),
    ('entregado', 'Entregado'),
    ('cancelado', 'Cancelado'),
]

class Orden(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Usa tu modelo de Usuario si tienes uno personalizado
    productos = models.ManyToManyField(ProductoDetalle, through='OrdenProductoDetalle')
    estado = models.CharField(max_length=20, choices=ESTADOS_POSIBLES)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

class OrdenProductoDetalle(models.Model):  # Modelo intermedio para la relación ManyToMany
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE)
    productodetalle = models.ForeignKey(ProductoDetalle, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
class TipoPago(models.Model):
    TIPOS_PAGO_CHOICES = [
        ('paypal', 'PayPal'),
        ('transferencia', 'Transferencia'),
        ('efectivo', 'Efectivo'),
        ('online', 'Pagos en Línea Visa'),
    ]

    nombre = models.CharField(max_length=20, choices=TIPOS_PAGO_CHOICES, unique=True)
    imagen_qr = models.ImageField(upload_to='pagos/codigos_qr/', blank=True, null=True)

    def __str__(self):
        return self.nombre
class Carrito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='carritos')
    productos_detalle = models.ManyToManyField(ProductoDetalle, through='CarritoProductoDetalle', blank=True)  # Permitir carrito sin detalles de productos
    disponible = models.BooleanField(default=True)
    def calcular_total(self):
        total = 0
        for carrito_producto_detalle in self.carritoproductodetalle_set.all():
            precio_producto = carrito_producto_detalle.productodetalle.producto.precio
            cantidad = carrito_producto_detalle.cantidad
            total += precio_producto * cantidad
        return total

    def __str__(self):
        return f"{self.usuario.username} - Carrito"


class CarritoProductoDetalle(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    productodetalle = models.ForeignKey(ProductoDetalle, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def subtotal(self):
        return self.productodetalle.producto.precio * self.cantidad

    def __str__(self):
        return f"{self.carrito.usuario.username} - {self.productodetalle.producto.nombre} - Detalle en Carrito"

class Transacción(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    carrito = models.OneToOneField(Carrito, on_delete=models.CASCADE)
    tipo_pago = models.ForeignKey(TipoPago, on_delete=models.SET_NULL, null=True)  # Añadido el campo tipo_pago
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - Transacción"


class Factura(models.Model):
    transacción = models.OneToOneField(Transacción, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

    def calcular_total(self):
        return self.transacción.carrito.calcular_total()

    def __str__(self):
        return f"{self.transacción.usuario.username} - Factura"

