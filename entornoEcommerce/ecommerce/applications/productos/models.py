from django.db import models
from django.core.exceptions import ValidationError
class Color(models.Model):
    nombre = models.CharField(max_length=100)

class Tamaño(models.Model):
    nombre = models.CharField(max_length=100)
    dimensiones = models.CharField(max_length=100)




class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Subcategoria(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='subcategorias')
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.categoria.nombre} - {self.nombre}"


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='productos')
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.SET_NULL, null=True, related_name='productos_subcategoria')
    descuento_porcentaje = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # Porcentaje de descuento
    imagenes = models.ManyToManyField('ImagenProducto', related_name='productos_asociados')  # 'ImagenProducto' como string.
    fecha_creacion = models.DateTimeField(auto_now_add=True)


class ProductoDetalle(models.Model):
    ESTADOS_POSIBLES = [
        ('disponible', 'Disponible'),
        ('no_disponible', 'No Disponible'),
    ]

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    tamaño = models.ForeignKey(Tamaño, on_delete=models.CASCADE)
    imagen2D = models.ImageField(upload_to='productos/imagenes2d/', blank=True, null=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.color.nombre} - {self.tamaño.nombre}"


class Modelo3D(models.Model):
    productodetalle = models.OneToOneField(ProductoDetalle, on_delete=models.CASCADE)
    ruta_modelo_3d = models.FileField(upload_to='productos/modelos3d/')

class ImagenProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes_producto')
    ruta_imagen = models.ImageField(upload_to='productos/imagenes/')


