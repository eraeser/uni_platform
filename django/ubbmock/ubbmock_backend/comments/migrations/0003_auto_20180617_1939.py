# Generated by Django 2.0.4 on 2018-06-17 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_auto_20180617_1937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='votes',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
