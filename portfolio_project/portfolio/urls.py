from django.urls import path
from . import views # Import my views

app_name = 'portfolio' # needed for namespacing

urlpatterns = [
    path('', views.home, name='home'), # Maps the root URL to the index view
]
