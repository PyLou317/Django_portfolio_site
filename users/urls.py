from django.urls import path, reverse_lazy
from . import views

app_name = 'users' # needed for namespacing

urlpatterns = [
    path('profile/', views.user_profile, name='profile_home'),
    path('profile/update_profile/(?P<pk>\d+)', views.UserSettings.as_view(success_url = reverse_lazy('profile_home')), name='update_profile'),
]