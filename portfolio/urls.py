from django.urls import path
from . import views # Import my views

from django.conf import settings
from django.conf.urls.static import static

app_name = 'portfolio' # needed for namespacing

urlpatterns = [
    path('', views.home, name='home'), # Maps the root URL to the index view in the portfolio app
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
