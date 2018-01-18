from rest_framework import serializers
from .models import Appliance

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