from .models import Color, Categoria, Subcategoria, Producto, ProductoDetalle, Modelo3D, ImagenProducto
from .serializers import (ColorSerializer, CategoriaSerializer, SubcategoriaReadSerializer,
                          SubcategoriaWriteSerializer,
                         ProductoDetalleSerializer, Modelo3DSerializer)
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from .serializers import ImagenProductoSerializer, ProductoSerializer
from rest_framework.decorators import api_view
@api_view(['GET'])
def ProductoSearchView(request):
    query = request.GET.get('q', '')
    productos = Producto.objects.filter(nombre__icontains=query)[:10]  # Limitar a 10 resultados
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)
class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def create(self, request, *args, **kwargs):
        producto_serializer = ProductoSerializer(data=request.data)
        if producto_serializer.is_valid():
            with transaction.atomic():
                producto = producto_serializer.save()

                # Guardar las imágenes
                imagenes_data = request.FILES.getlist('imagenes')
                for img_data in imagenes_data:
                    ImagenProducto.objects.create(producto=producto, ruta_imagen=img_data)

                return Response(producto_serializer.data, status=status.HTTP_201_CREATED)
        return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoDetalleViewSet(viewsets.ModelViewSet):
    queryset = ProductoDetalle.objects.all()
    serializer_class = ProductoDetalleSerializer

class Modelo3DViewSet(viewsets.ModelViewSet):
    queryset = Modelo3D.objects.all()
    serializer_class = Modelo3DSerializer

class ImagenProductoViewSet(viewsets.ModelViewSet):
    queryset = ImagenProducto.objects.all()
    serializer_class = ImagenProductoSerializer


class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = Subcategoria.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return SubcategoriaWriteSerializer
        return SubcategoriaReadSerializer