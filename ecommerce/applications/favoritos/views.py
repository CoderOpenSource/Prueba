# views.py
from rest_framework import viewsets
from .models import ProductoFavorito
from .serializers import ProductoFavoritoSerializer

class ProductoFavoritoViewSet(viewsets.ModelViewSet):
    queryset = ProductoFavorito.objects.all()
    serializer_class = ProductoFavoritoSerializer
