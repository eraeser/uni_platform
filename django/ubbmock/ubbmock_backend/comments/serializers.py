from rest_framework import serializers
from .models import Comment, CommentVotes


class CommentSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='author.username', read_only=True)
    vote_score = serializers.SerializerMethodField()

    def get_vote_score(self, obj):
        return obj.commentvotes_set.filter(vote_action=True).count() - obj.commentvotes_set.filter(vote_action=False).count()

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author',
                  'username', 'vote_score', 'parent_thread',
                  'parent_comment', 'is_deleted', 'creation_time')
        read_only_fields = ('author', 'parent_thread',
                            'vote_score', 'parent_comment', 'creation_time')


class CreateCommentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_thread', 'parent_comment', 'creation_time')
