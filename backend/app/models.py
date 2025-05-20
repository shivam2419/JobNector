from django.db import models
from django.contrib.auth.models import User

# User type selector
class UserType(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_candidate = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

# Candidate profile
class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    qualification = models.CharField(max_length=30)
    school = models.CharField(max_length=100)
    pass_out_year = models.CharField(max_length=10)
    resume = models.FileField(upload_to='resumes/')
    extracted_keywords = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

# Recruiter profile
class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    designation = models.CharField(max_length=50)
    company_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

# Job postings
class Job(models.Model):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    min_salary = models.IntegerField()
    max_salary = models.IntegerField()
    salary_type = models.CharField(max_length=100, null=True)
    duration = models.CharField(max_length=20)
    description = models.TextField()
    skills = models.JSONField(blank=True, default=list)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

    class Meta:
        unique_together = ('recruiter', 'title', 'description')

# Job applications
class Application(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    applied_at = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

    class Meta:
        unique_together = ('candidate', 'job')

# Notification
class Notification(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    message = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True, null = True)
