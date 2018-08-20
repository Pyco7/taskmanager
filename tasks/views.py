from django.shortcuts import render
from rest_framework import viewsets

from .models import Tile, Task
from .serializers import TileSerializer, TaskSerializer


def index(request):
    return render(request, 'index.html')


class TileViewSet(viewsets.ModelViewSet):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset()
        if 'tile_id' in self.request.query_params:
            tile_id = int(self.request.query_params['tile_id'])
            return queryset.filter(tile__id=tile_id)
        return queryset
