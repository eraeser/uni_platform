from rest_framework import serializers
from .models import Channel


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = ('id', 'name', 'description', 'creation_time', 'icon')
        read_only_fields = ('name', 'creation_time')


class CreateChannelSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Channel.objects.create(**validated_data)

    class Meta:
        model = Channel
        fields = ('id', 'name', 'description', 'creation_time', 'icon')
