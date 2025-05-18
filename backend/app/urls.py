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
    path('api/usertype/', CurrentUserTypeView.as_view(), name='current-user-type'),
    path('api/get-candidate/', CurrentCandidateView.as_view(), name='current-candidate'),
    path('api/get-recruiter/', CurrentRecruiterView.as_view(), name='current-recruiter'),
    path('api/posted-jobs/', PostedJobsView.as_view(), name='posted-jobs'),
]