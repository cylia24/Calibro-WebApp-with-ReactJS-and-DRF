from rest_framework import serializers 
from .models import *

class NormeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Norme
        fields = '__all__'