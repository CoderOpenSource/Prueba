from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Bitacora
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, generics, permissions, mixins
from .serializers import UsuarioSerializer, RegisterUsuarioSerializer, UsuarioTrabajadorSerializer
from .permissions import *
from datetime import datetime
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

...

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def logout_view(request):
    try:
        # lógica de logout...
        # Aquí puedes obtener el usuario de la request
        user = request.user

        # Agregar a la bitácora
        bitacora_entry = Bitacora(usuario=user, accion='Cierre de sesión', fecha=datetime.now())
        bitacora_entry.save()

        return Response({'message': 'Logout successful'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        print(email)
        print(password)
        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({'error': 'Contraseña Incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
            # Añadir entrada a la bitácora
        bitacora_entry = Bitacora(usuario=user, accion='Inicio de sesión', fecha=datetime.now())
        bitacora_entry.save()
        refresh = RefreshToken.for_user(user)

        foto_url = user.foto_perfil.url if user.foto_perfil else None

        # Obtiene el role del usuario basado en los grupos
        # Asume que un usuario pertenece solo a un grupo (role)
        user_groups = user.groups.all()
        role = user_groups[0].name if user_groups else None  # Aquí obtenemos el primer grupo como rol

        user_data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'email': user.email,
            'foto_perfil': foto_url,
            'role': role  # Añadimos el role aquí
        }

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_data': user_data
        })
class UsuarioTrabajadorViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioTrabajadorSerializer
    queryset = Usuario.objects.all()  # Añade esta línea
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        # Filtramos solo los usuarios con role "Trabajador"
        return Usuario.objects.filter(groups__name="Trabajador")

class ClienteUsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterUsuarioSerializer
    queryset = Usuario.objects.all()

    def get_queryset(self):
        # Filtramos solo los usuarios con role "Cliente"
        return Usuario.objects.filter(groups__name="Cliente")




