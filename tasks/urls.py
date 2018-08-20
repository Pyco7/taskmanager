from django.urls import path, re_path, include
from rest_framework import routers

from .views import index, TaskViewSet, TileViewSet


router = routers.SimpleRouter()
router.register(r'tiles', TileViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    re_path(r'^$', index, name='index'),
    path('api/', include(router.urls)),
]
