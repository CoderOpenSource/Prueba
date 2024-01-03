# serializers.py
from rest_framework import serializers
from .models import ProductoFavorito

class ProductoFavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoFavorito
        fields = '__all__'
