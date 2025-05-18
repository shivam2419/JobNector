from django.shortcuts import render
from rest_framework import viewsets
from .models import UserType, Candidate, Recruiter, Job, Application
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

# Create your views here.
def index(request):
    return render(request, 'index.html')

class CustomLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": user.id,
                "username": user.username,
            })
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class CurrentUserTypeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            usertype = UserType.objects.get(user=request.user)
            serializer = UserTypeSerializer(usertype)
            return Response(serializer.data)
        except UserType.DoesNotExist:
            return Response({"detail": "UserType not found"}, status=404)
        
class CurrentCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            candidate = Candidate.objects.get(user=request.user)
            serializer = CandidateSerializer(candidate)
            return Response(serializer.data)
        except Candidate.DoesNotExist:
            return Response({"detail": "Candidate profile not found."}, status=404)
        
class CurrentRecruiterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            recruiter = Recruiter.objects.get(user=request.user)
            serializer = RecruiterSerializer(recruiter)
            return Response(serializer.data)
        except Recruiter.DoesNotExist:
            return Response({"detail": "Recruiter profile not found."}, status=404)
        
class PostedJobsView(ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            recruiter = Recruiter.objects.get(user=self.request.user)
            return Job.objects.filter(recruiter=recruiter)
        except Recruiter.DoesNotExist:
            return Job.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": "No jobs posted yet or recruiter not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserTypeViewSet(viewsets.ModelViewSet):
    queryset = UserType.objects.all()
    serializer_class = UserTypeSerializer

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
