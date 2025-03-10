from django.urls import path
from . import views

app_name = 'portfolio' # needed for namespacing

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('projects/<int:pk>/', views.project_redirect, name='project_redirect'),
]
