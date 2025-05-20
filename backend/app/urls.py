from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'usertype', UserTypeViewSet)
router.register(r'candidate', CandidateViewSet)
router.register(r'recruiter', RecruiterViewSet)
router.register(r'create-job', JobViewSet)
router.register(r'application', ApplicationViewSet)

urlpatterns = [
    path('', index),
    path('api/', include(router.urls)),
    path('api/login/', CustomLoginView.as_view(), name='custom_login'),
    path('api/get-usertype/<str:user_id>/', CurrentUserTypeView.as_view(), name='current-user-type'),
    path('api/get-candidate/', CurrentCandidateView.as_view(), name='current-candidate'),
    path('api/get-recruiter/', CurrentRecruiterView.as_view(), name='current-recruiter'),
    path('api/candidate/update_by_user/<int:user_id>/', CandidateUpdateByUserId.as_view(), name='candidate-update-by-user'),
    path('api/posted-jobs/', PostedJobsView.as_view(), name='posted-jobs'),
    path('api/get-jobs/', GetAllJobsView.as_view(), name='posted-jobs'),
    path('api/job/<int:job_id>/', GetJobDetailView.as_view(), name='get-job-detail'),
    path('api/apply/', ApplyToJobView.as_view(), name='apply-to-job'),
    path('api/job-candidates/', GetJobCandidates.as_view(), name='get-candidates'),
    path('api/accept-application/', AcceptApplicationView.as_view(), name='accept-application'),
    path('api/notifications/<int:user_id>/', CandidateNotificationView.as_view(), name='candidate-notifications'),
]