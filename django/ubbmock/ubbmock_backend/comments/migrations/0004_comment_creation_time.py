# Generated by Django 2.0.4 on 2018-06-18 11:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_auto_20180617_1939'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='creation_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
