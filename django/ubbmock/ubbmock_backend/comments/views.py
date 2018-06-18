from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Comment
from .serializers import CreateCommentSerializer, CommentSerializer


class CommentViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    """
    Updates and retrieves comments
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    @action(methods=['get'], detail=True,
            url_path='replies', url_name='replies')
    def get_comments(self, request, pk=None):
        comment = self.get_object()
        replies = comment.comment_set.all()
        return Response([CommentSerializer(reply).data for reply in replies])

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCommentSerializer

        return super().get_serializer_class()



