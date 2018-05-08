from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Comment
# from .permissions import IsUserOrReadOnly
from .serializers import CreateCommentSerializer, CommentSerializer


class CommentViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    Updates and retrieves comments
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = (IsUserOrReadOnly,)


class CommentCreateViewSet(mixins.CreateModelMixin,
                           mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    """
    Creates comments
    """
    queryset = Comment.objects.all()
    serializer_class = CreateCommentSerializer
    permission_classes = (AllowAny,)

    @action(methods=['get'], detail=True,
            url_path='replies', url_name='replies')
    def get_comments(self, request, pk=None):
        comment = self.get_object()
        replies = comment.comment_set.all()
        return Response([CommentSerializer(reply).data for reply in replies])

