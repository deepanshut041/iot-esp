from rest_framework import serializers
from .models import Appliance

from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework_jwt.settings import api_settings

class ApplianceModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appliance
        fields = [
            'id',
            'user',
            'name',
            'label',
            'switch_value',
            'slider_value',
            'slider_min',
            'slider_max',
            'slider_step',
        ]

class UserLoginSerializer(serializers.ModelSerializer):
    """
    docstring here
    :param serializers.ModelSerializer: 
    """
    token = serializers.CharField(allow_blank=True, read_only=True)
    id = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField(label='Username', required=False, allow_blank=True)
    email = serializers.EmailField(label='Email Address', required=False, allow_blank=True)

    class Meta:
        model= User
        fields = [
            'username',
            'email',
            'password',
            'token',
            'id'
        ]
        extra_kwargs = {"password":{"write_only":True}}

    def validate(self, data):
        user_obj = None
        username = data.get("username", None)
        email = data.get("email", None)
        password = data["password"]
        if email:
            email = email.lower()
        if not email and not username:
            raise serializers.ValidationError("username or Email is Required to login")
        
        user = User.objects.filter(
            Q(email=email) |
            Q(username=username)
        ).distinct()
        user = user.exclude(email__isnull=True).exclude(email__iexact='')
        if user.exists and user.count() == 1:
            user_obj = user.first()
        else:
            raise serializers.ValidationError("Username or Email dosen't exist")

        if user_obj:
            if not user_obj.is_active:
                raise serializers.ValidationError("Please activate your service again")
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Incorrect password please try again")
                
        payload = api_settings.JWT_PAYLOAD_HANDLER(user_obj)
        data["token"] = api_settings.JWT_ENCODE_HANDLER(payload)
        data['username'] = user_obj.get_username()
        return data
