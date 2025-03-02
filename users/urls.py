from django.urls import path
from . import views

app_name = 'users' # needed for namespacing

urlpatterns = [
    path('profile/', views.user_profile, name='user_profile'),
]