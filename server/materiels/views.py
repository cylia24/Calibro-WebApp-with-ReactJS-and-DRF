from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Materiel
from .serializers import MaterielSerializer
from django.http import JsonResponse

class MaterielViewSet(viewsets.ModelViewSet):
    queryset = Materiel.objects.all()
    serializer_class = MaterielSerializer
    
@api_view(['DELETE'])
def delete_materiel(request, numero_interne_materiel):
    try:
        materiel = Materiel.objects.get(numero_interne_materiel=numero_interne_materiel)
        materiel.delete()
        return JsonResponse({'message': 'Materiel deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Materiel.DoesNotExist:
        return JsonResponse({'message': 'Materiel not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_materiel(request):
    if request.method == 'POST':
        serializer = MaterielSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def modifier_materiel(request, id_materiel):
    try:
        materiel = Materiel.objects.get(id_materiel=id_materiel)
    except Materiel.DoesNotExist:
        return Response({'message': 'Materiel not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_reference = request.data.get('reference_materiel')
    new_designation = request.data.get('designation_materiel')
    new_numero_interne = request.data.get('numero_interne_materiel')
    new_certificat = request.data.get('certificat')
    new_date_emission = request.data.get('date_emission')
    new_observation = request.data.get('observation_materiel')
    new_etat = request.data.get('etat_materiel')

    if new_reference is not None:
        materiel.reference_materiel = new_reference
    if new_designation is not None:
        materiel.designation_materiel = new_designation
    if new_numero_interne is not None:
        materiel.numero_interne_materiel = new_numero_interne
    if new_certificat is not None:
        materiel.certificat = new_certificat
    if new_date_emission is not None:
        materiel.date_emission = new_date_emission
    if new_observation is not None:
        materiel.observation_materiel = new_observation
    if new_etat is not None:
        materiel.etat_materiel = new_etat

    materiel.save()
    serializer = MaterielSerializer(materiel)
    return Response(serializer.data)

@api_view(['GET'])
def get_materiel_details(request, numero_interne_materiel):
    try:
        materiel = Materiel.objects.get(numero_interne_materiel=numero_interne_materiel)
        serializer = MaterielSerializer(materiel)
        return JsonResponse(serializer.data)
    except Materiel.DoesNotExist:
        return JsonResponse({'message': 'Materiel not found.'}, status=404)

@api_view(['GET'])
def get_materiel_details_id(request, id_materiel):
    try:
        materiel = Materiel.objects.get(id_materiel=id_materiel)
        serializer = MaterielSerializer(materiel) 
        return JsonResponse(serializer.data)
    except Materiel.DoesNotExist:
        return JsonResponse({'message': 'Materiel not found.'}, status=404)
