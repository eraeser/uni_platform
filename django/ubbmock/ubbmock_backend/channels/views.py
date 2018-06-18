from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Channel
from .serializers import CreateChannelSerializer, ChannelSerializer
from ..threads.serializers import ThreadSerializer


class ChannelViewSet(mixins.RetrieveModelMixin,
                     mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    Updates and retrieves channels
    """
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (AllowAny,)

    @action(methods=['get'], detail=True,
            url_path='threads', url_name='threads')
    def get_threads(self, request, pk=None):
        channel = self.get_object()
        threads = channel.thread_set.all()
        return Response([ThreadSerializer(thread).data for thread in threads])

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateChannelSerializer

        return super().get_serializer_class()
