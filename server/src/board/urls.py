from django.conf.urls import re_path, include, url
from rest_framework_jwt.views import verify_jwt_token

from .views import ApplianceArduinoView, ApplianceModelView, ApplianceDetailModelView, UserLoginAPIView
urlpatterns = [
    url(r'^board/(?P<username>\w+)/$', ApplianceArduinoView.as_view(), name='appliance-arduino'),
    url(r'^appliance/(?P<username>\w+)/$', ApplianceModelView.as_view(), name='appliance-list'),
    url(r'^appliance/detail/(?P<pk>[0-9]+)/$', ApplianceDetailModelView.as_view(), name='appliance-detail'),
    url(r'^auth/login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^auth/verify/$',  verify_jwt_token, name='token-verify'),
]