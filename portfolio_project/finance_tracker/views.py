from django.shortcuts import render

# Create your views here.
def finance_tracker_home(request):
    return render(request, 'finance_tracker/index.html')