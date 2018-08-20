from rest_framework import serializers
from .models import Tile, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'tile', 'order', 'title', 'task_type', 'description')


class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = ('id', 'status', 'launch_date', 'tasks')

    status = serializers.CharField()
    launch_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    tasks = serializers.SerializerMethodField()

    def get_tasks(self, task):
        return task.tasks.count()
