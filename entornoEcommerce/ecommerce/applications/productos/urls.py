from rest_framework.routers import DefaultRouter
from .views import (ColorViewSet, CategoriaViewSet, SubcategoriaViewSet, ProductoViewSet,
                   ProductoDetalleViewSet, Modelo3DViewSet, ImagenProductoViewSet, ProductoSearchView)
from django.urls import path
router = DefaultRouter()
router.register(r'colores', ColorViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'subcategorias', SubcategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'productosdetalle', ProductoDetalleViewSet)
router.register(r'modelos3d', Modelo3DViewSet)
router.register(r'imagenesproducto', ImagenProductoViewSet)


urlpatterns = [
    *router.urls,
    path('search/', ProductoSearchView, name='producto-search'),
    ]