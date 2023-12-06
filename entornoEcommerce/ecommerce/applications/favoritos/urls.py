# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoFavoritoViewSet

router = DefaultRouter()
router.register(r'productos_favoritos', ProductoFavoritoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
