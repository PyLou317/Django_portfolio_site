from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import UploadFileForm

def finance_tracker_home(request):
    return render(request, 'finance_tracker/finance_tracker_home.html')

def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/finance_tracker/")
    else:
        form = UploadFileForm()
    return render(request, 'finance_tracker/upload.html', {'form': form})