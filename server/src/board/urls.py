from django.conf.urls import re_path, include, url

from .views import ApplianceModelView
urlpatterns = [
    url(r'^board/$', ApplianceModelView.as_view(), name='appliance'),
]