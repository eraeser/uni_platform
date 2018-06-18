from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
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

    def get_object(self):
        if self.kwargs['pk'] == 'me':
            return self.request.user
        else:
            return super().get_object()

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='following', url_name='following')
    def get_followed_threads(self, request, pk=None):
        user = self.get_object()
        followed = user.followed_threads.all()
        return Response([ThreadSerializer(thread).data for thread in followed])

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='subscribed', url_name='subscribed')
    def get_subscribed_channels(self, request, pk=None):
        user = self.get_object()
        subscribed = user.subscribed_channels.all()
        return Response([ChannelSerializer(channel).data for channel in subscribed])

    @action(methods=['put'], detail=True, permission_classes=[IsAuthenticated],
            url_path='follow', url_name='follow')
    def follow_thread(self, request, pk=None):
        user = self.get_object()
        try:
            user.followed_threads.add(request.data['id'])
            user.save()
            return Response("Followed")
        except:
            user.followed_threads.remove(request.data['id'])
            user.save()
            return Response("Unfollowed")

    @action(methods=['put'], detail=True, permission_classes=[IsAuthenticated],
            url_path='subscribe', url_name='subscribe')
    def subscribe_channel(self, request, pk=None):
        user = self.get_object()
        try:
            user.subscribed_channels.add(request.data['id'])
            user.save()
            return Response('Subscribed')
        except:
            user.subscribed_channels.remove(request.data['id'])
            user.save()
            return Response('Unsubscribed')


class UserCreateViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    """
    Creates user accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)


