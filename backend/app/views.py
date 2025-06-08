from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404

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
            if hasattr(user, 'candidate'):
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user_id": user.id,
                    "username": user.username,
                    "resume_url": str(user.candidate.resume),
                    "skills": user.candidate.extracted_keywords,
                })
            else:
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user_id": user.id,
                    "username": user.username,
                })

        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class CurrentUserTypeView(APIView):
    def get(self, request, user_id):
        try:
            user_type = UserType.objects.get(user__id=user_id)
            return Response({
                'user': user_type.user.id,
                'is_candidate': user_type.is_candidate,
                'is_recruiter': user_type.is_recruiter
            })
        except UserType.DoesNotExist:
            return Response({'error': 'UserType not found'}, status=status.HTTP_404_NOT_FOUND)
        
class CurrentCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            candidate = Candidate.objects.get(user=request.user)
            serializer = CandidateSerializer(candidate)
            return Response(serializer.data)
        except Candidate.DoesNotExist:
            return Response({"Error": "Candidate profile not found."}, status=404)
    def patch(self, request, user_id):
        try:
            candidate = Candidate.objects.get(user__id=user_id)
        except Candidate.DoesNotExist:
            return Response({"Error": "Candidate not found"}, status=404)

        serializer = CandidateSerializer(candidate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        
class CandidateUpdateByUserId(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, user_id):
        candidate = get_object_or_404(Candidate, user__id=user_id)
        serializer = CandidateSerializer(candidate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        
class GetAllJobsView(APIView):
    def get(self, request):
        jobs = Job.objects.all().order_by('-created_at') 
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetJobDetailView(APIView):
    def get(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

        user_id = request.GET.get('user_id')
        already_applied = False

        if user_id:
            try:
                candidate = Candidate.objects.get(user__id=user_id)
                already_applied = Application.objects.filter(candidate=candidate, job=job).exists()
            except Candidate.DoesNotExist:
                already_applied = False

        job_data = JobSerializer(job).data
        job_data["already_applied"] = already_applied
        return Response(job_data)
   
class ApplyToJobView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        job_id = request.data.get('job_id')

        if not user_id or not job_id:
            return Response({'error': 'Both candidate_id and job_id are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            candidate = Candidate.objects.get(user__id=user_id)
            job = Job.objects.get(id=job_id)
        except Candidate.DoesNotExist:
            return Response({'error': 'Candidate not found'}, status=status.HTTP_404_NOT_FOUND)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if already applied
        if Application.objects.filter(candidate=candidate, job=job).exists():
            return Response({'error': 'You have already applied to this job.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Create application
        Application.objects.create(candidate=candidate, job=job, status='Pending')
        return Response({'message': 'Application submitted successfully.'}, status=status.HTTP_201_CREATED)

class GetJobCandidates(APIView):
    def get(self, request):
        job_id = request.GET.get("job_id")
        if not job_id:
            return Response({'error': 'Job ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({'error': 'No Job found for this job ID'}, status=status.HTTP_404_NOT_FOUND)

        applications = Application.objects.filter(job=job, status="Pending")
        if not applications.exists():
            return Response({'error': 'No Candidates found for this job'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ApplicationSerializer(applications, many=True)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)

class AcceptApplicationView(APIView):
    def post(self, request):
        application_id = request.data.get("application_id")
        new_status = request.data.get("status")  # Expected: "Accepted" or "Rejected"

        if not application_id or not new_status:
            return Response(
                {"error": "Application ID and status are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            application = Application.objects.get(id=application_id)
        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if new_status not in ["Accepted", "Rejected"]:
            return Response(
                {"error": "Invalid status. Must be 'Accepted' or 'Rejected'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Send appropriate notification
        recruiter_name = str(application.job.recruiter.user)
        message = f"Your application has been {new_status.lower()} by {recruiter_name}"
        
        Notification.objects.create(
            candidate=application.candidate,
            recruiter=application.job.recruiter,
            message=message
        )

        application.status = new_status
        application.save()

        return Response(
            {"message": f"Application status updated to {new_status}."},
            status=status.HTTP_200_OK
        )

class CandidateNotificationView(APIView):
    def get(self, request, user_id):
        try:
            candidate = Candidate.objects.get(user__id=user_id)
            notifications = Notification.objects.filter(candidate=candidate).order_by('-id')
            serializer = NotificationSerializer(notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Candidate.DoesNotExist:
            return Response({'error': 'Candidate not found'}, status=status.HTTP_404_NOT_FOUND)




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
    permission_classes = [IsAuthenticated]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
