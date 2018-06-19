# Generated by Django 2.0.4 on 2018-06-18 18:54

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comments', '0007_auto_20180618_2142'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='votes',
            field=models.ManyToManyField(related_name='comment_votes', through='comments.CommentVotes', to=settings.AUTH_USER_MODEL),
        ),
    ]
