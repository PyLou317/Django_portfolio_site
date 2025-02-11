from django.shortcuts import render, get_object_or_404, redirect
from .models import Project

# Create your views here.
def home(request):
    projects = Project.objects.all() # Get all prpjects from database
    return render(request, 'portfolio/index.html', {'projects': projects}) # Renders the index.html template and pass the projects to the template


def project_redirect(request, pk):
    project = get_object_or_404(Project, pk=pk)  # Get the specific project

    if project.type == 'FINANCE':
        return redirect('finance_tracker:home') 
    # elif project.type == 'BLOG':
    #     return redirect('blog:home') 
    # elif project.type == 'FIT_WEATHER':
    #     return redirect('weather_app:home') 
    # elif project.type == 'BUSINESS_FINDER':
    #     return redirect('business_finder:home') 
    else:
        # Handle other project types
        return redirect('home') # Or another appropriate view


def about(request):
    return render(request, 'portfolio/about.html') # Renders the index.html template and pass the projects to the template

