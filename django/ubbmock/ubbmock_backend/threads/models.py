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
    creation_time = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True)
    content = models.TextField(max_length=1500)
    votes = models.ManyToManyField(settings.AUTH_USER_MODEL, through='ThreadVotes', related_name='thread_votes')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent_channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    users_set = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followed_threads', blank=True)

    def __str__(self):
        return str(self.name) + ' ' + str(self.author) + ' ' + str(self.parent_channel)


class ThreadVotes(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    vote_action = models.BooleanField(default=False)
