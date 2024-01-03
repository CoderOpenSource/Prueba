from .base import *
DEBUG = True

ALLOWED_HOSTS = ['*']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ecommerce',
        'USER': 'mosito',
        'PASSWORD': '1000', # Coloca aquí la contraseña que hayas asignado a mosito
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

STATIC_URL = 'static/'
