from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

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
    transactions = Transaction.objects.all().prefetch_related('category') # Added prefetch to get category before it's serialized
    
    transaction_data_list = []
    for transaction in transactions:
        transaction_data = {
            'date': transaction.date.isoformat() if transaction.date else None, # Format date as string
            'category': transaction.category.name if transaction.category else None, # Get category name
            'description': transaction.description,
            'amount': str(transaction.amount) # Convert Decimal to string for JSON
        }
        transaction_data_list.append(transaction_data)

    # 2. Pass the list of dictionaries to the template (no need for serializers.serialize):
    transactions_json = json.dumps(transaction_data_list) # Serialize manually to JSON
    return render(request, 'finance_tracker/transaction_table.html', {'transactions_json': transactions_json}) # Replace 'your_template.html' with your template name


class TransactionListView(ListView):
    paginate_by = 25
    model = Transaction
