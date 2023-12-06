from django.db import models
from ..usuarios.models import Usuario
from ..productos.models import ProductoDetalle
from ..sucursales.models import Inventario  # Asegúrate de importar correctamente
from datetime import datetime, timedelta
from django.utils import timezone

class Reserva(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto_detalle = models.ForeignKey(ProductoDetalle, on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField(auto_now_add=True)  # Fecha en la que se hizo la reserva.
    cantidad = models.PositiveIntegerField()
    expirado = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self._update_inventario(increment=True)  # Aumenta el inventario antes de eliminar la reserva
        super(Reserva, self).delete(*args, **kwargs)

    def has_expired(self):
        return timezone.now() - self.fecha_reserva > timedelta(days=1)

    def _update_inventario(self, increment=False):
        inventarios = Inventario.objects.filter(productodetalle=self.producto_detalle)
        if not inventarios:
            # Si no se encuentra ningún objeto Inventario, podrías querer manejar este caso.
            # Por ejemplo, puedes levantar una excepción o simplemente retornar.
            raise ValueError("No se encontró el inventario para el detalle del producto.")

        for inventario in inventarios:
            # Si increment es True, aumenta el inventario, de lo contrario, lo reduce.
            if increment:
                inventario.cantidad += self.cantidad
            else:
                inventario.cantidad -= self.cantidad
                # Asegúrate de no tener cantidades negativas en el inventario.
                if inventario.cantidad < 0:
                    inventario.cantidad = 0
            inventario.save()

    def save(self, *args, **kwargs):
        if not self.pk:  # Si es una nueva reserva
            self._update_inventario(increment=False)
        super(Reserva, self).save(*args, **kwargs)

    def delete_if_expired(self):
        if self.has_expired():
            self._update_inventario(increment=True)
            self.delete()

    def __str__(self):
        return f"{self.usuario.username} - {self.producto_detalle.producto.nombre} - {self.fecha_reserva}"

    class Meta:
        unique_together = ('usuario', 'producto_detalle')
