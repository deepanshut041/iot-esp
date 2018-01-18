from django.conf.urls import re_path, include, url

from .views import ApplianceArduinoView
urlpatterns = [
    url(r'^board/(?P<username>\w+)/$', ApplianceArduinoView.as_view(), name='appliance'),
]