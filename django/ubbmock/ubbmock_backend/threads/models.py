import uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.utils.encoding import python_2_unicode_compatible
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from ..channels.models import Channel


@python_2_unicode_compatible
class Thread(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    content = models.CharField(max_length=1420)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name) + ' ' + str(self.author) + ' ' + str(self.parent_channel)
