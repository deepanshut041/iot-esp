from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from django.contrib.auth.models import User
from .models import Appliance
from .serializer import ApplianceModelSerializer
# Create your views here.

class ApplianceArduinoView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ApplianceModelSerializer

    def get_appliance(self, pk):
        try:
            return Appliance.objects.filter(user=pk)
        except Appliance.DoesNotExist:
            raise Http404

    def get(self, request, username):
        
        try:
            user = User.objects.get(username = username)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is None:
            raise Http404
        appliances = self.get_appliance(user.pk)
        appliance_serializer = ApplianceModelSerializer(appliances, many=True)
        response = {}
        for appliance in appliance_serializer.data:
            response.update({appliance["label"]+ "_switch":appliance["switch_value"]})
            response.update({appliance["label"]+ "_slider":appliance["slider_value"]})
        return Response(response)
    