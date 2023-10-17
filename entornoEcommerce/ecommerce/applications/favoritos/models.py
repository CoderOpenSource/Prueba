from django.db import models
from ..usuarios.models import Usuario  # Importar el modelo Usuario de la app usuarios.
from ..productos.models import Producto  # Importar el modelo Producto de la app productos.


class ProductoFavorito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='productos_favoritos')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='usuarios_favoritos')
    fecha_agregado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario} - {self.producto} - {self.fecha_agregado}"
