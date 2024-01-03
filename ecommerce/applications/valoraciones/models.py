from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from ..usuarios.models import Usuario  # Asegúrate de importar correctamente
from ..productos.models import Producto  # Asegúrate de importar correctamente

class Valoracion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    comentario = models.TextField(blank=True, null=True)  # Puede ser opcional
    calificacion = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    fecha = models.DateTimeField(auto_now_add=True)  # Fecha en la que se creó la valoración.

    def __str__(self):
        return f"{self.usuario.username} - {self.producto.nombre} - {self.calificacion} - {self.fecha}"
