from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _


# Modelo de Usuario
class Usuario(AbstractUser):
    telefono = models.CharField(max_length=15, blank=True, null=True)
    foto_perfil = models.ImageField(upload_to='usuarios/fotos_perfil/', blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    # Las relaciones groups y user_permissions son heredadas de AbstractUser,
    # así que no es necesario redefinirlas aquí. Sin embargo, si quisieras
    # cambiar algún comportamiento o añadir comentarios, podrías hacerlo.
    # En tu caso, has redefinido las relaciones para cambiar el related_name,
    # lo cual está bien.

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="custom_user_set",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="custom_user_set",
        related_query_name="user",
    )

    def __str__(self):
        return self.username


# Modelo de Bitácora
class Bitacora(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    accion = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha']

    def __str__(self):
        return f"{self.usuario} - {self.accion} - {self.fecha}"
