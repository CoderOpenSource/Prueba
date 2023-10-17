from rest_framework.routers import DefaultRouter
from .views import SucursalViewSet, InventarioViewSet

router = DefaultRouter()
router.register(r'sucursales', SucursalViewSet)
router.register(r'inventarios', InventarioViewSet)

urlpatterns = router.urls
