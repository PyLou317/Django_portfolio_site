from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from django.views.generic.list import ListView
from django.utils import timezone

from .forms import UploadFileForm
from .models import Transaction
from django.core import serializers

def finance_tracker_home(request):
    return render(request, 'finance_tracker/dashboard.html')


def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/finance_tracker/")
    else:
        form = UploadFileForm()
    return render(request, 'finance_tracker/upload.html', {'form': form})


def transaction_table(request):
    transactions = Transaction.objects.all()
    
    # Django can't pass json data to HTML so you have to Serialize Queryset
    transactions_json = serializers.serialize('json', transactions)
    
    context = {'transactions_json': transactions_json}
    return render(request, 'finance_tracker/transaction_table.html', context)


class TransactionListView(ListView):
    paginate_by = 25
    model = Transaction
