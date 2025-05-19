from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# --- User ---
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# --- User Type ---
class UserTypeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = UserType
        fields = ['user', 'is_candidate', 'is_recruiter']

# --- User details for Candidate ---
class CandidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

# --- Full Candidate with nested User ---
class CandidateDisplaySerializer(serializers.ModelSerializer):
    user = CandidateUserSerializer(read_only=True)

    class Meta:
        model = Candidate
        fields = [
            'user', 'phone_number', 'city', 'state', 'country',
            'qualification', 'school', 'pass_out_year', 'resume'
        ]

# --- Base Candidate serializer (for creation) ---
class CandidateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    resume = serializers.FileField(use_url=True)
    class Meta:
        model = Candidate
        fields = '__all__'

# --- Recruiter ---
class RecruiterSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Recruiter
        fields = '__all__'

# --- Job ---
class JobSerializer(serializers.ModelSerializer):
    recruiter = serializers.PrimaryKeyRelatedField(queryset=Recruiter.objects.all())
    recruiter_details = RecruiterSerializer(source='recruiter', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

# --- Application with nested candidate + job ---
class ApplicationSerializer(serializers.ModelSerializer):
    candidate = CandidateDisplaySerializer(read_only=True)
    job = JobSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'