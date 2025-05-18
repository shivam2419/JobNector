from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserType, Candidate, Recruiter, Job, Application

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserTypeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = UserType
        fields = ['user', 'is_candidate', 'is_recruiter']

class CandidateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Accept user ID

    class Meta:
        model = Candidate
        fields = '__all__'


class RecruiterSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Accept user ID

    class Meta:
        model = Recruiter
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    recruiter = serializers.PrimaryKeyRelatedField(queryset=Recruiter.objects.all())  # Accept user ID
    recruiter_details = RecruiterSerializer(source='recruiter', read_only=True)
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    candidate = CandidateSerializer(read_only=True)
    job = JobSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
