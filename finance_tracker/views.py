from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse

from django.views.generic.list import ListView
from django.utils import timezone

from .forms import UploadFileForm
from .models import Transaction
from django.core import serializers

import json

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
    return render(request, 'finance_tracker/transaction_table.html') 


def transaction_list_json(request): # NEW view to return JSON data
    transactions = Transaction.objects.all().prefetch_related('category')
    transaction_data_list = []
    for transaction in transactions:
        transaction_data = {
            'date': transaction.date.isoformat() if transaction.date else None,
            'category': transaction.category.name if transaction.category else None,
            'description': transaction.description,
            'amount': str(transaction.amount)
        }
        transaction_data_list.append(transaction_data)
    return JsonResponse(transaction_data_list, safe=False) # Returns JSON response


class TransactionListView(ListView):
    paginate_by = 25
    model = Transaction
