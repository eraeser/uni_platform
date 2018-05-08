from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_thread', 'parent_comment', 'is_deleted',)
        read_only_fields = ('author', 'parent_thread', 'parent_comment', 'is_deleted',)


class CreateCommentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_thread', 'parent_comment',)
