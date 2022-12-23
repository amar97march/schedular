from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path('asset_all/', AssetAPI.as_view(), name='asset-url'),
]