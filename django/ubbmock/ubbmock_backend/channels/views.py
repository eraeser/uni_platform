from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import Channel
# from .permissions import IsUserOrReadOnly
from .serializers import CreateChannelSerializer, ChannelSerializer


class ChannelViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    Updates and retrieves channels
    """
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    # permission_classes = (IsUserOrReadOnly,)


class ChannelCreateViewSet(mixins.CreateModelMixin,
                           mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    """
    Creates channels
    """
    queryset = Channel.objects.all()
    serializer_class = CreateChannelSerializer
    permission_classes = (AllowAny,)
