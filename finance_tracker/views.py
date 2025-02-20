from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse

from django.views.generic.list import ListView
from django.utils import timezone

from .forms import UploadFileForm
from .models import Transaction
from django.core import serializers
from django.db.models import Q 

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
    paginate_by = 10
    model = Transaction
    ordering = ['-date'] 
    
    def get_queryset(self): 
        queryset = super().get_queryset()
        search_term = self.request.GET.get('search_term') # Get the search term from the request
        clear_search = self.request.GET.get('clear_search') # Get value of 'clear_search'

        if clear_search: # Check if 'clear_search' parameter is present
            return super().get_queryset()
        
        if search_term: 
            queryset = queryset.filter(
                Q(description__icontains=search_term) |
                Q(category__name__icontains=search_term)
            )
        return queryset
