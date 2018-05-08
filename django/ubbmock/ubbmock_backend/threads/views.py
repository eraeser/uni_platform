from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Thread
# from .permissions import IsUserOrReadOnly
from .serializers import CreateThreadSerializer, ThreadSerializer
from ..comments.serializers import CommentSerializer


class ThreadViewSet(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """
    Updates and retrives channels
    """
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    # permission_classes = (IsUserOrReadOnly,)

    @action(methods=['get'], detail=True,
            url_path='comments', url_name='comments')
    def get_comments(self, request, pk=None):
        thread = self.get_object()
        comments = thread.comment_set.all()
        return Response([CommentSerializer(comment).data for comment in comments])


class ThreadCreateViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          viewsets.GenericViewSet):
    """
    Creates channels
    """
    queryset = Thread.objects.all()
    serializer_class = CreateThreadSerializer
    permission_classes = (AllowAny,)
