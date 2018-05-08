from rest_framework import serializers
from .models import Thread


class ThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = ('id', 'name', 'description', 'content', 'author', 'parent_channel',)
        read_only_fields = ('author', 'parent_channel',)


class CreateThreadSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Thread.objects.create(**validated_data)

    class Meta:
        model = Thread
        fields = ('id', 'name', 'description', 'content', 'author', 'parent_channel',)
