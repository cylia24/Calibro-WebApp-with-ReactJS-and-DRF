from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Norme
from .serializers import NormeSerializer
from django.http import JsonResponse

class NormeViewSet(viewsets.ModelViewSet):
    queryset = Norme.objects.all()
    serializer_class = NormeSerializer

@api_view(['DELETE'])
def delete_norme(request, numero_norme):
    try:
        norme = Norme.objects.get(numero_norme=numero_norme)
        norme.delete()
        return JsonResponse({'message': 'Norme deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Norme.DoesNotExist:
        return JsonResponse({'message': 'Norme not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_norme(request):
    if request.method == 'POST':
        serializer = NormeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def modifier_norme(request, id_norme):
    try:
        norme = Norme.objects.get(id_norme=id_norme)
    except Norme.DoesNotExist:
        return Response({'message': 'Norme not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_designation = request.data.get('designation_norme')
    new_numero = request.data.get('numero_norme')
    new_observation = request.data.get('observation_norme')

    if new_designation is not None:
        norme.designation_norme = new_designation
    if new_numero is not None:
        norme.numero_norme = new_numero
    if new_observation is not None:
        norme.observation_norme = new_observation

    norme.save()
    serializer = NormeSerializer(norme)
    return Response(serializer.data)

@api_view(['GET'])
def get_norme_details_id(request, id_norme):
    try:
        norme = Norme.objects.get(id_norme=id_norme)
        serializer = NormeSerializer(norme) 
        return JsonResponse(serializer.data)
    except Norme.DoesNotExist:
        return JsonResponse({'message': 'Norme not found.'}, status=404)

@api_view(['GET'])
def get_norme_details(request, numero_norme):
    try:
        norme = Norme.objects.get(numero_norme=numero_norme)
        serializer = NormeSerializer(norme) 
        return JsonResponse(serializer.data)
    except Norme.DoesNotExist:
        return JsonResponse({'message': 'Norme not found.'}, status=404)
