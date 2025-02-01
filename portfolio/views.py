from django.shortcuts import render, get_object_or_404
from .models import Project

# Create your views here.
def home(request):
    projects = Project.objects.all() # Get all prpjects from database
    return render(request, 'portfolio/index.html', {'projects': projects}) # Renders the index.html template and pass the projects to the template

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk) # Uses Project and id to return project details, return 404 if not found
    return render(
        request,
        "portfolio/project_detail.html",
        {"project": project} # Turns project object into dict for rendering on the .html page
    )