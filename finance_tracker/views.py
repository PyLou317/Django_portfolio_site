from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from django.views.generic.list import ListView
from django.utils import timezone

from .forms import UploadFileForm
from .models import Transaction

def finance_tracker_home(request):
    return render(request, 'finance_tracker/index.html')


def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/finance_tracker/")
    else:
        form = UploadFileForm()
    return render(request, 'finance_tracker/upload.html', {'form': form})


class TransactionListView(ListView):
    paginate_by = 25
    model = Transaction
