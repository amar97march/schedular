from django.db import models


class Asset(models.Model):
    # Asset Model
    name = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    experience = models.FloatField(blank=True, null=True)
    course = models.CharField(max_length=100, blank=True, null=True)
    call_video = models.BooleanField(default=False)
    call_email = models.BooleanField(default=False)
    call_text = models.BooleanField(default=False)

    def __str__(self):
        return self.name
