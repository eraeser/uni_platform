from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Comment, CommentVotes
from .serializers import CreateCommentSerializer, CommentSerializer


class CommentViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    """
    Updates and retrieves comments
    """
    queryset = Comment.objects.all().order_by('-creation_time')
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    @action(methods=['get'], detail=True,
            url_path='replies', url_name='replies')
    def get_comments(self, request, pk=None):
        comment = self.get_object()
        replies = comment.comment_set.filter(is_deleted=False).order_by('-creation_time')
        return Response([CommentSerializer(reply).data for reply in replies])

    @action(methods=['patch'], detail=True, permission_classes=[IsAuthenticated],
            url_path='vote', url_name='vote')
    def vote(self, request, pk=None):
        comment = self.get_object()
        vote_action = request.data['action']

        try:
            vote = CommentVotes.objects.filter(user=request.user, comment=comment).get()
            vote.delete()
            if vote_action == 'upvote' and not vote.vote_action:
                v = CommentVotes(user=request.user, comment=comment, vote_action=True)
                v.save()
            elif vote_action == 'downvote' and vote.vote_action:
                v = CommentVotes(user=request.user, comment=comment, vote_action=False)
                v.save()
        except ObjectDoesNotExist:
            if vote_action == 'upvote':
                v = CommentVotes(user=request.user, comment=comment, vote_action=True)
                v.save()
            elif vote_action == 'downvote':
                v = CommentVotes(user=request.user, comment=comment, vote_action=False)
                v.save()

        return Response(comment.commentvotes_set.filter(vote_action=True).count() - comment.commentvotes_set.filter(vote_action=False).count())

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCommentSerializer

        return super().get_serializer_class()



