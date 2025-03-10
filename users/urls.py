from django.urls import path, reverse_lazy
from . import views

app_name = 'users' # needed for namespacing

urlpatterns = [
    path('profile/', views.user_profile, name='profile_home'),
    path('profile/update_profile/', views.UserSettings.as_view(), name='update_profile'),
]