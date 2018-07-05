from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Thread, ThreadVotes
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
        comments = thread.comment_set.filter(is_deleted=False).order_by('-creation_time')
        return Response([CommentSerializer(comment).data for comment in comments])

    @action(methods=['patch'], detail=True, permission_classes=[IsAuthenticated],
            url_path='vote', url_name='vote')
    def vote(self, request, pk=None):
        thread = self.get_object()
        vote_action = request.data['action']

        try:
            vote = ThreadVotes.objects.filter(user=request.user, thread=thread).get()
            vote.delete()
            if vote_action == 'upvote' and not vote.vote_action:
                v = ThreadVotes(user=request.user, thread=thread, vote_action=True)
                v.save()
            elif vote_action == 'downvote' and vote.vote_action:
                v = ThreadVotes(user=request.user, thread=thread, vote_action=False)
                v.save()
        except ObjectDoesNotExist:
            if vote_action == 'upvote':
                v = ThreadVotes(user=request.user, thread=thread, vote_action=True)
                v.save()
            elif vote_action == 'downvote':
                v = ThreadVotes(user=request.user, thread=thread, vote_action=False)
                v.save()

        return Response(thread.threadvotes_set.filter(vote_action=True).count() - thread.threadvotes_set.filter(vote_action=False).count())

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateThreadSerializer

        return super().get_serializer_class()
