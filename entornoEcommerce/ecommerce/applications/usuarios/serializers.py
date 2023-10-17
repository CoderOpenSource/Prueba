from .models import Usuario, Bitacora
from django.contrib.auth.models import Group
from rest_framework import viewsets, mixins, status, serializers
from rest_framework.response import Response
from datetime import datetime
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class UsuarioTrabajadorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'first_name', 'email', 'foto_perfil', 'telefono', 'password', 'address']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)

        # Asegurarse de que se proporciona una contraseña al crear
        if not password:
            raise serializers.ValidationError({"password": "Este campo es obligatorio."})

        user.set_password(password)
        user.save()
        # Añade una entrada a la bitácora después de crear el usuario
        bitacora_entry = Bitacora(
            usuario=user,  # o `usuario=self.context['request'].user` si deseas registrar quién hizo la acción
            accion=f'Creó al usuario {user.username}',
            fecha=datetime.now()
        )
        bitacora_entry.save()

        cliente_group, _ = Group.objects.get_or_create(name='Trabajador')
        user.groups.add(cliente_group)
        return user

    def update(self, instance, validated_data):
        # La contraseña ya no es requerida aquí, por lo que simplemente se elimina si es que se proporcionó.
        validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Añade una entrada a la bitácora después de editar el usuario
        bitacora_entry = Bitacora(
            usuario=self.context['request'].user,
            accion=f'Editó al usuario {instance.username}',
            fecha=datetime.now()
        )
        bitacora_entry.save()
        return instance


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id','username', 'first_name', 'last_name', 'email', 'foto_perfil', 'telefono', 'groups', 'password', 'address']

    def create(self, validated_data):
        # Extraemos y eliminamos el campo groups de validated_data
        groups_data = validated_data.pop('groups')
        password = validated_data.pop('password')

        # Creamos el usuario
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()

        # Asignamos los grupos al usuario utilizando set()
        user.groups.set(groups_data)

        return user

    def update(self, instance, validated_data):
        # Extraemos y eliminamos el campo password de validated_data si está presente
        password = validated_data.pop('password', None)

        # Si proporcionas otros campos como groups, también deberías manejarlos aquí.
        # Por ejemplo:
        groups_data = validated_data.pop('groups', None)

        # Actualiza los campos normales
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Si se proporcionó una nueva contraseña, hashearla y guardarla
        if password:
            instance.set_password(password)
            instance.save()

        # Si se proporcionaron nuevos grupos, asignarlos al usuario
        if groups_data:
            instance.groups.set(groups_data)

        return instance


class RegisterUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'first_name', 'email', 'foto_perfil', 'telefono', 'password', 'address']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario(**validated_data)

        # Asegurarse de que se proporciona una contraseña al crear
        if not password:
            raise serializers.ValidationError({"password": "Este campo es obligatorio."})

        user.set_password(password)
        user.save()
        cliente_group, _ = Group.objects.get_or_create(name='Cliente')
        user.groups.add(cliente_group)
        return user

    def update(self, instance, validated_data):
        # La contraseña ya no es requerida aquí, pero si se proporciona, se actualiza.
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        return instance

