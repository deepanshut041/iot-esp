from django.contrib import admin

from .models import Appliance

@admin.register(Appliance)
class ApplianceAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'label', 'switch_value', 'slider_value')
