from django.conf.urls import re_path, include, url

from .views import ApplianceArduinoView, ApplianceModelView, ApplianceDetailModelView
urlpatterns = [
    url(r'^board/(?P<username>\w+)/$', ApplianceArduinoView.as_view(), name='appliance-arduino'),
    url(r'^appliance/(?P<username>\w+)/$', ApplianceModelView.as_view(), name='appliance-list'),
    url(r'^appliance/detail/(?P<pk>[0-9]+)/$', ApplianceDetailModelView.as_view(), name='appliance-detail'),
]