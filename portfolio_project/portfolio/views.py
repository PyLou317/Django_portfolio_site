from django.shortcuts import render
from .models import Project

# Create your views here.
def index(request):
    projects = Project.objects.all() # Get all prpjects from database
    return render(request, 'portfolio/index.html', {'projects': projects}) # Renders the index.html template and pass the projects to the template