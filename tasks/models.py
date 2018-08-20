from django.db import models


class Tile(models.Model):
    STATUS_CHOICES = (
        ('L', 'Live'),
        ('P', 'Pending'),
        ('A', 'Archived'),
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    launch_date = models.DateTimeField()

    class Meta:
        ordering = ('launch_date',)

    def __str__(self):
        return self.get_status_display()


class Task(models.Model):
    tile = models.ForeignKey('tasks.Tile', related_name='tasks', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(db_index=True, default=0)
    title = models.CharField(max_length=100)
    task_type = models.CharField(max_length=50)
    description = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.title
