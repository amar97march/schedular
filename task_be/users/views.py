from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AssetSerializer
from .models import *

class AssetAPI(APIView):

    def get(self, request):
        # Get API
        paper_objs = Asset.objects.all()
        serializer = AssetSerializer(paper_objs, many=True)
        return Response({
            "status": 200,
            'message': 'Records found',
            'data': serializer.data
            })