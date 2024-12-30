from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username and password:
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully"}, status=HTTP_201_CREATED)
    return Response({"error": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
