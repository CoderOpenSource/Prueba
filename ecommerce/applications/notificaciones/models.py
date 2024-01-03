from django.db import models
from ..usuarios.models import Usuario  # Asegúrate de importar correctamente

class Notificacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
