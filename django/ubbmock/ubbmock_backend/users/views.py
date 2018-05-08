from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User
from .permissions import IsUserOrReadOnly
from .serializers import CreateUserSerializer, UserSerializer
from ..threads.serializers import ThreadSerializer
from ..channels.serializers import ChannelSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """
    Updates and retrieves user accounts
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrReadOnly,)

    @action(methods=['get'], detail=True,
            url_path='following', url_name='following')
    def get_followed_threads(self, request, pk=None):
        user = self.get_object()
        followed = user.followed_threads.all()
        return Response([ThreadSerializer(thread).data for thread in followed])

    @action(methods=['get'], detail=True,
            url_path='subscribed', url_name='subscribed')
    def get_subscribed_channels(self, request, pk=None):
        user = self.get_object()
        subscribed = user.subscribed_channels.all()
        return Response([ChannelSerializer(channel).data for channel in subscribed])


class UserCreateViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    """
    Creates user accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)


