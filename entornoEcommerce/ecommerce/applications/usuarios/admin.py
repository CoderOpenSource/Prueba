from django.contrib import admin
from .models import Usuario, Bitacora # Añade otros modelos según necesites

admin.site.register(Usuario)
admin.site.register(Bitacora)