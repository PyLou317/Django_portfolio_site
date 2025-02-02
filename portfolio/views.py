from django.shortcuts import render, get_object_or_404
from .models import Project

# Create your views here.
def home(request):
    projects = Project.objects.all() # Get all prpjects from database
    return render(request, 'portfolio/index.html', {'projects': projects}) # Renders the index.html template and pass the projects to the template


def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    context = {'project': project}  # Pass the project object to the context
    return render(request, 'project_detail.html', context)
