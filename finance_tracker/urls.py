from django.urls import path
from . import views

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='finance_tracker_home'),
]
