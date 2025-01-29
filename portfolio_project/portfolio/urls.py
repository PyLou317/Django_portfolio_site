from django.urls import path
from . import views # Import my views

app_name = 'portfolio' # needed for namespacing

urlpatterns = [
    path('', views.index, name='index'), # Maps the root URL to the index view
]
