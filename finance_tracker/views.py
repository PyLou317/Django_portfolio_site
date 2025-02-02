from django.shortcuts import render
from django.http import HttpResponse
from .forms import UploadFileForm
from .models import Transaction
import pandas as pd

# Create your views here.
def finance_tracker_home(request):
    return render(request, 'finance_tracker/finance_tracker_home.html')

def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            # Handle the uploaded file
            file = request.FILES['file']
            # ... File processing logic here ...
            
            return HttpResponse('File uploaded successfully!')
        else:
            return HttpResponse("Invalid file.")
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})