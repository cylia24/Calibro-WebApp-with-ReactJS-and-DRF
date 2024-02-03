from rest_framework import serializers 
from .models import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'

class OperationEtalonnageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperationEtalonnage
        fields = '__all__'

