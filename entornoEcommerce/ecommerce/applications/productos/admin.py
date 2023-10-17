from django.contrib import admin

from .models import Producto
from .models import Color
from .models import ProductoDetalle
from .models import Tamaño
from .models import ImagenProducto
from .models import Modelo3D

# Register your models here.
admin.site.register(Producto)
admin.site.register(Color)
admin.site.register(ProductoDetalle)
admin.site.register(Tamaño)
admin.site.register(ImagenProducto)
admin.site.register(Modelo3D)