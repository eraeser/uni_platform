from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Thread
from .serializers import CreateThreadSerializer, ThreadSerializer
from ..comments.serializers import CommentSerializer


class ThreadViewSet(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    """
    Updates and retrives channels
    """
    queryset = Thread.objects.all().order_by('-creation_time')
    serializer_class = ThreadSerializer
    permission_classes = (AllowAny,)

    @action(methods=['get'], detail=True,
            url_path='comments', url_name='comments')
    def get_comments(self, request, pk=None):
        thread = self.get_object()
        comments = thread.comment_set.all().order_by('-creation_time')
        return Response([CommentSerializer(comment).data for comment in comments])

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateThreadSerializer

        return super().get_serializer_class()
