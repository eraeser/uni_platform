from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author',
                  'username', 'votes', 'parent_thread',
                  'parent_comment', 'is_deleted', 'creation_time')
        read_only_fields = ('author', 'username', 'parent_thread', 'parent_comment', 'is_deleted', 'creation_time')


class CreateCommentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_thread', 'parent_comment', 'creation_time')
