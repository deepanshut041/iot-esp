from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from .models import Appliance
from .serializer import ApplianceModelSerializer
# Create your views here.

class ApplianceModelView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ApplianceModelSerializer

    def get_appliance(self, pk):
        try:
            return Appliance.objects.filter(pk=pk)
        except Appliance.DoesNotExist:
            raise Http404

    def get(self, request, username):
        appliance = self.get_appliance(username)
        appliance_serializer = ApplianceModelSerializer(appliance, many=True)

        return Response(appliance_serializer.data)
    