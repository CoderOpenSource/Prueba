from rest_framework.routers import DefaultRouter
from .views import LoginView, UsuarioViewSet, ClienteUsuarioViewSet, UsuarioTrabajadorViewSet, logout_view
from django.urls import path

 # Asegúrate de importar tu UsuarioViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)  # Esto creará las rutas para operaciones CRUD para el modelo Usuario
router.register(r'usuarios-cliente', ClienteUsuarioViewSet)
router.register(r'usuarios-Trabajador', UsuarioTrabajadorViewSet)
urlpatterns = [
    *router.urls,
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
]