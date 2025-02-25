from django.views.generic.list import ListView
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from .forms import UploadFileForm
from django.utils import timezone

from .models import Transaction

from django.core import serializers
from django.db.models import Q, Sum

import datetime
import json


def finance_tracker_home(request):
    income = Transaction.objects.filter(category__name='income')
    return render(request, 'finance_tracker/index.html')


def finance_tracker_dashboard(request):
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


def transaction_list_json(request): 
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


def category_expenses_json(request):
    year = request.GET.get('year')
    if not year:
        year = datetime.date.today().year
    else:
        year = int(year)

    category_expenses = Transaction.objects.filter(
        date__year=2024
    ).values('category__name').annotate(
        total_expense=Sum('amount')
    ).order_by('-total_expense').exclude( # don't include income in result
        category__name='income')
    
    # Format the data for JSON response
    category_data = []
    for item in category_expenses:
        category_data.append({
            'category': item['category__name'], 
            'total_expense': str(item['total_expense'])
        })

    return JsonResponse(category_data, safe=False) # Return JSON response


def income_total_json(request):
    year = request.GET.get('year')
    if not year:
        year = 2024
        # datetime.date.today().year
    else:
        year = int(year)

    # Filter income transactions for the year
    income_transactions_for_year = Transaction.objects.filter(
        date__year = year,
        category__name = 'income'
    )
        
    # Group by month and category, and sum amounts
    monthly_income_data = income_transactions_for_year.values(
        'date__month', 'category__name'
    ).annotate(
        total_income=Sum('amount')
    ).order_by('date__month', 'category__name')
    
    
    # Format the data for JSON response
    income_data = []
    for item in monthly_income_data:
        month_number = item['date__month']
        month_name = datetime.date(year=year, month=month_number, day=1).strftime('%B')
        
        income_data.append({
            'month': month_name,
            'category': item['category__name'],
            'total_income': float(item['total_income'])
        })

    return JsonResponse(income_data, safe=False) # Return JSON response


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
