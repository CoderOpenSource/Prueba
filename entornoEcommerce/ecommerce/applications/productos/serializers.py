from rest_framework import serializers
from .models import Color, Categoria, Producto, ProductoDetalle, Modelo3D, ImagenProducto, Subcategoria

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# Serializador para lectura
class SubcategoriaReadSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Subcategoria
        fields = '__all__'

# Serializador para escritura
class SubcategoriaWriteSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())

    class Meta:
        model = Subcategoria
        fields = '__all__'


class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = '__all__'


from .models import ImagenProducto


class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ImagenProductoSerializer(many=True, read_only=True)
    subcategoria_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_subcategoria_nombre(self, obj):
        return obj.subcategoria.nombre if obj.subcategoria else 'Sin subcategoría'

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Obtener y serializar las imágenes manualmente
        imagenes = ImagenProducto.objects.filter(producto=instance)
        imagenes_serializer = ImagenProductoSerializer(imagenes, many=True)

        # Agregar las imágenes serializadas a la representación del producto
        representation['imagenes'] = imagenes_serializer.data

        return representation


class ProductoDetalleSerializer(serializers.ModelSerializer):
    producto_id = serializers.PrimaryKeyRelatedField(source='producto', queryset=Producto.objects.all(),
                                                     write_only=True)
    color_id = serializers.PrimaryKeyRelatedField(source='color', queryset=Color.objects.all(), write_only=True)

    producto = ProductoSerializer(read_only=True)
    color = ColorSerializer(read_only=True)

    class Meta:
        model = ProductoDetalle
        fields = '__all__'

class Modelo3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo3D
        fields = '__all__'

