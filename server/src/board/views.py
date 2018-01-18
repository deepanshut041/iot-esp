from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from .models import Appliance
from .serializer import ApplianceModelSerializer
# Create your views here.

class ApplianceModelView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ApplianceModelSerializer