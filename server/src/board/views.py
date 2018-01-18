from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status

from django.contrib.auth.models import User
from .models import Appliance
from .serializer import ApplianceModelSerializer, UserLoginSerializer
# Create your views here.

class ApplianceArduinoView(APIView):
    permission_classes = (permissions.AllowAny,)

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

class ApplianceModelView(APIView):
    serializer_class = ApplianceModelSerializer
    permission_classes = (permissions.IsAuthenticated,)

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
        return Response(appliance_serializer.data)

class ApplianceDetailModelView(APIView):
    serializer_class = ApplianceModelSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_appliance(self, pk):
        try:
            return Appliance.objects.get(pk=pk)
        except Appliance.DoesNotExist:
            raise Http404

    def get(self, request, pk):

        appliance = self.get_appliance(pk)
        appliance_serializer = ApplianceModelSerializer(appliance)
        return Response(appliance_serializer.data)
    
    def put(self, request, pk, format=None):
        appliance = self.get_appliance(pk)
        serializer = ApplianceModelSerializer(appliance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    """
    docstring here
        :param APIView: 
    """
    serializer_class = UserLoginSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    