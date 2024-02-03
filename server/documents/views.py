from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer
from django.http import JsonResponse

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
@api_view(['DELETE'])
def delete_document(request, numero_document):
    try:
        document = Document.objects.get(numero_document=numero_document)
        document.delete()
        return JsonResponse({'message': 'Document deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Document.DoesNotExist:
        return JsonResponse({'message': 'Document not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_document(request):
    if request.method == 'POST':
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def modifier_document(request, id_document):
    try:
        document = Document.objects.get(id_document=id_document)
    except Document.DoesNotExist:
        return Response({'message': 'Document not found.'}, status=status.HTTP_404_NOT_FOUND)

    new_designation = request.data.get('designation_document')
    new_numero = request.data.get('numero_document')
    new_observation = request.data.get('observation_document')

    if new_designation is not None:
        document.designation_document = new_designation
    if new_numero is not None:
        document.numero_document = new_numero
    if new_observation is not None:
        document.observation_document = new_observation

    document.save()
    serializer = DocumentSerializer(document)
    return Response(serializer.data)

@api_view(['GET'])
def get_document_details(request, numero_document):
    try:
        document = Document.objects.get(numero_document=numero_document)
        serializer = DocumentSerializer(document)
        return JsonResponse(serializer.data)
    except Document.DoesNotExist:
        return JsonResponse({'message': 'Document not found.'}, status=404)

@api_view(['GET'])
def get_document_details_id(request, id_document):
    try:
        document = Document.objects.get(id_document=id_document)
        serializer = DocumentSerializer(document) 
        return JsonResponse(serializer.data)
    except Document.DoesNotExist:
        return JsonResponse({'message': 'Document not found.'}, status=404)