from rest_framework import serializers
from .models import Thread


class ThreadSerializer(serializers.ModelSerializer):

    vote_score = serializers.SerializerMethodField()

    def get_vote_score(self, obj):
        return obj.threadvotes_set.filter(vote_action=True).count() - obj.threadvotes_set.filter(vote_action=False).count()

    class Meta:
        model = Thread
        fields = ('id', 'name', 'description', 'content', 'vote_score', 'author', 'parent_channel', 'creation_time')
        read_only_fields = ('author', 'parent_channel',)


class CreateThreadSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Thread.objects.create(**validated_data)

    class Meta:
        model = Thread
        fields = ('id', 'name', 'description', 'content', 'author', 'parent_channel', 'creation_time')
