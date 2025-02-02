from django.urls import path
from . import views

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='home'),
    path('file_upload/', views.upload_statement, name='file_upload'),
]
