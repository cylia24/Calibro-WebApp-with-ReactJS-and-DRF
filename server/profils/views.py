"""from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            request.session['user_id'] = user.id  # Stockez l'ID de l'utilisateur en session
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'})"""


# views.py
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        # print('Token généré :', token.key)
        return Response({'token': token.key})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    # print(request.user) 
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
    }
    return Response(user_data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # Supprimer le jeton de l'utilisateur
    request.auth.delete()
    return Response({'message': 'Déconnexion réussie'})


