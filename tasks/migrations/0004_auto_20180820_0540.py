# Generated by Django 2.1 on 2018-08-20 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20180819_2024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='order',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
    ]
