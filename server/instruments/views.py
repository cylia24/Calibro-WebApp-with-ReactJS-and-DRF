from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class InstrumentViewSet(viewsets.ModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer
class OperationEtalonnageViewSet(viewsets.ModelViewSet):
    queryset = OperationEtalonnage.objects.all()
    serializer_class = OperationEtalonnageSerializer


@api_view(['POST'])
def create_instrument(request):
    if request.method == 'POST':
        serializer = InstrumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_instrument(request, numero_interne_instrument):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
        instrument.delete()
        return JsonResponse({'message': 'Instrument deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)
@api_view(['PUT'])
def modifier_etat_instrument(request, id_instrument):
    try:
        instrument = Instrument.objects.get(id_instrument=id_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_etat = request.data.get('etat_instrument')

    if new_etat is not None:
        instrument.etat_instrument = new_etat

    instrument.save()
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['PUT'])
def modifier_instrument(request, id_instrument):
    try:
        instrument = Instrument.objects.get(id_instrument=id_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_reference = request.data.get('reference_instrument')
    new_etat = request.data.get('etat_instrument')
    new_designation = request.data.get('designation_instrument')
    new_numero_interne = request.data.get('numero_interne_instrument')
    new_type = request.data.get('type_instrument')
    new_service = request.data.get('service_instrument')
    new_mois_etalonnage = request.data.get('mois_etalonnage')
    new_critere_acceptation = request.data.get('critere_acceptation')
    new_frequence_controle = request.data.get('frequence_controle')
    new_observation = request.data.get('observation_instrument')

    if new_reference is not None:
        instrument.reference_instrument = new_reference
    if new_etat is not None:
        instrument.etat_instrument = new_etat
    if new_designation is not None:
        instrument.designation_instrument = new_designation
    if new_numero_interne is not None:
        instrument.numero_interne_instrument = new_numero_interne
    if new_type is not None:
        instrument.type_instrument = Type.objects.get(id_type=new_type)
    if new_service is not None:
        instrument.service_instrument = Service.objects.get(id_service=new_service)
    if new_mois_etalonnage is not None:
        instrument.mois_etalonnage = new_mois_etalonnage
    if new_critere_acceptation is not None:
        instrument.critere_acceptation = new_critere_acceptation
    if new_frequence_controle is not None:
        instrument.frequence_controle = new_frequence_controle
    if new_observation is not None:
        instrument.observation_instrument = new_observation

    instrument.save()
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)
    
@api_view(['GET'])
def get_instrument_details(request, numero_interne_instrument):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
        serializer = InstrumentSerializer(instrument)  # Assurez-vous d'avoir le sérialiseur approprié
        return JsonResponse(serializer.data)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Instrument not found.'}, status=404)

@api_view(['GET'])
def get_instrument_details_id(request, id_instrument):
    try:
        instrument = Instrument.objects.get(id_instrument=id_instrument)
        serializer = InstrumentSerializer(instrument)  # Assurez-vous d'avoir le sérialiseur approprié
        return JsonResponse(serializer.data)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Instrument not found.'}, status=404)

@api_view(['PUT'])
def affecter_materiel(request, numero_interne_instrument, materiel_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        materiel = Materiel.objects.get(pk=materiel_id)
    except Materiel.DoesNotExist:
        return Response({'message': 'Materiel not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.materiels_instrument.add(materiel)
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['PUT'])
def annuler_affectation_materiel(request, numero_interne_instrument, materiel_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        materiel = Materiel.objects.get(pk=materiel_id)
    except Materiel.DoesNotExist:
        return Response({'message': 'Materiel not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.materiels_instrument.remove(materiel)  # Utilisez remove() pour retirer le matériel
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['PUT'])
def affecter_document(request, numero_interne_instrument, document_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        document = Document.objects.get(pk=document_id)
    except Document.DoesNotExist:
        return Response({'message': 'Document not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.documents_instrument.add(document)
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['PUT'])
def annuler_affectation_document(request, numero_interne_instrument, document_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        document = Document.objects.get(pk=document_id)
    except Document.DoesNotExist:
        return Response({'message': 'Document not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.documents_instrument.remove(document)  # Utilisez remove() pour retirer le document
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)


@api_view(['PUT'])
def affecter_norme(request, numero_interne_instrument, norme_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        norme = Norme.objects.get(pk=norme_id)
    except Norme.DoesNotExist:
        return Response({'message': 'Norme not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.normes_instrument.add(norme)
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['PUT'])
def annuler_affectation_norme(request, numero_interne_instrument, norme_id):
    try:
        instrument = Instrument.objects.get(numero_interne_instrument=numero_interne_instrument)
    except Instrument.DoesNotExist:
        return Response({'message': 'Instrument not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        norme = Norme.objects.get(pk=norme_id)
    except Norme.DoesNotExist:
        return Response({'message': 'Norme not found.'}, status=status.HTTP_404_NOT_FOUND)

    instrument.normes_instrument.remove(norme)  # Utilisez remove() pour retirer le document
    serializer = InstrumentSerializer(instrument)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_operation(request, id_operation):
    try:
        operation = OperationEtalonnage.objects.get(id_operation=id_operation)
        operation.delete()
        return JsonResponse({'message': 'Operation deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Operation not found.'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
def modifier_operation(request, id_operation):
    try:
        operation = OperationEtalonnage.objects.get(id_operation=id_operation)
    except OperationEtalonnage.DoesNotExist:
        return Response({'message': 'Operation not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_resultat = request.data.get('resultat_operation')
    new_observation = request.data.get('observation_etalonnage')
    new_numero_pv = request.data.get('numero_pv')

    if new_resultat is not None:
        operation.resultat_operation = new_resultat
    if new_observation is not None:
        operation.observation_etalonnage = new_observation
    if new_numero_pv is not None:
        operation.numero_pv = new_numero_pv

    operation.save()
    serializer = OperationEtalonnageSerializer(operation)
    return Response(serializer.data)

@api_view(['GET'])
def get_operation_details_id(request, id_operation):
    try:
        operation = OperationEtalonnage.objects.get(id_operation=id_operation)
        serializer = OperationEtalonnageSerializer(operation) 
        return JsonResponse(serializer.data)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Operation not found.'}, status=404)

@api_view(['GET'])   
def chercher_operations_instrument(request, id_instrument):
    try:
        operations = OperationEtalonnage.objects.filter(instrument_operation=id_instrument)
        serializer = OperationEtalonnageSerializer(operations, many=True) 
        return JsonResponse(serializer.data, safe=False)
    except Instrument.DoesNotExist:
        return JsonResponse({'message': 'Operations not found.'}, status=404)

@api_view(['POST'])
def create_operation(request):
    if request.method == 'POST':
        serializer = OperationEtalonnageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_service_details_id(request, id_service):
    try:
        service = Service.objects.get(id_service=id_service)
        serializer = ServiceSerializer(service)  # Assurez-vous d'avoir le sérialiseur approprié
        return JsonResponse(serializer.data)
    except Service.DoesNotExist:
        return JsonResponse({'message': 'Service not found.'}, status=404)

