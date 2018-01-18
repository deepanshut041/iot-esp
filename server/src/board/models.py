from django.db import models
from django.contrib.auth.models import User

class Appliance(models.Model):
    name = models.CharField(max_length=50, null=False)
    number = models.IntegerField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    switch_value = models.BooleanField(null=False, default=False)
    slider_value = models.IntegerField(null=False, default=0)
    slider_min = models.IntegerField(null=False, default=0)
    slider_max = models.IntegerField(null=False, default=100)
    slider_step = models.DecimalField(max_digits=6, decimal_places=3, default=1.0)

    def __str__(self):
        return str(self.name)
