from rest_framework import permissions
from django.contrib.auth.models import Group


class IsAdminOrSelfOrWorker(permissions.BasePermission):
    """
    Permiso personalizado para asegurar que solo el usuario, el admin, el trabajador o el superusuario puedan editar o ver el perfil.
    """

    def has_permission(self, request, view):
        # Verifica si el usuario pertenece al grupo "Admin" o "Trabajador"
        is_admin = request.user.groups.filter(name='Admin').exists()
        is_worker = request.user.groups.filter(name='Trabajador').exists()

        # Si es un superusuario, admin o trabajador, se le permite listar.
        return request.user.is_authenticated and (is_admin or is_worker or request.user.is_superuser)

    def has_object_permission(self, request, view, obj):
        # Verifica si el usuario pertenece al grupo "Admin" o "Trabajador"
        is_admin = request.user.groups.filter(name='Admin').exists()
        is_worker = request.user.groups.filter(name='Trabajador').exists()

        # Permitir que el propio usuario lo edite, así como superusuarios, admins y trabajadores
        return obj == request.user or is_admin or is_worker or request.user.is_superuser


class IsAdminOrSuperuser(permissions.BasePermission):
    """
    Permiso personalizado para asegurar que solo el admin o el superusuario puedan eliminar un perfil.
    """

    def has_object_permission(self, request, view, obj):
        # Verifica si el usuario pertenece al grupo "Admin"
        is_admin = request.user.groups.filter(name='Admin').exists()

        return is_admin or request.user.is_superuser
