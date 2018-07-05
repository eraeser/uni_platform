import uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.utils.encoding import python_2_unicode_compatible
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


@python_2_unicode_compatible
class Channel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True)
    users_set = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='subscribed_channels', blank=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    icon = models.CharField(max_length=2**16, blank=True)

    def __str__(self):
        return str(self.name)
