from rest_framework import serializers
from .models import *


class AssetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asset
        fields = ['id']

    def to_representation(self, data): 
        data = super(AssetSerializer, self).to_representation(data)
        asset_obj = Asset.objects.get(id = int(data.get('id')))
        items = []
        items.append(asset_obj.id)
        items.append(asset_obj.name)
        items.append(asset_obj.branch)
        items.append(asset_obj.experience)
        items.append(asset_obj.course)
        items.append({ "video": asset_obj.call_video, "email": asset_obj.call_email, "text": asset_obj.call_text })
        data['items'] = items
        return data
    
