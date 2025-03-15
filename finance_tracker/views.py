from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView, DeleteView
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

from decimal import Decimal
from io import StringIO
from .utils import categorize_transaction

from .forms import UploadFileForm

from .models import Transaction, Category
from django.db.models import Q, Sum, DateTimeField
from django.db.models.functions import TruncMonth

from datetime import datetime
import csv



def finance_tracker_home(request):
    return render(request, 'finance_tracker/index.html')


@login_required
def finance_tracker_dashboard(request):
    expense_transactions = Transaction.objects.exclude(
        category__name='Income').filter(
            owner=request.user
        )
    expense_total_aggregation = expense_transactions.aggregate(
        total_expense_amount=Sum('amount')
        )
        
    income_transactions = Transaction.objects.filter(
        owner=request.user,
        category__name='Income')
    income_total_aggregation = income_transactions.aggregate(
     total_income_amount=Sum('amount')
     )
    
    context = {
        'income_summary': income_total_aggregation,
        'expense_summary': expense_total_aggregation
    }
    
    return render(request, 'finance_tracker/dashboard.html', context)


class TransactionListView(LoginRequiredMixin, ListView):
    paginate_by = 15
    model = Transaction
    ordering = ['-date'] 
    
    def get_queryset(self): 
        queryset = super().get_queryset().filter(
            owner=self.request.user)
        search_term = self.request.GET.get(
            'search_term') # Get the search term from the request
        clear_search = self.request.GET.get(
            'clear_search') # Get value of 'clear_search'

        if clear_search: # Check if 'clear_search' parameter is present
            return queryset
        
        if search_term: 
            queryset = queryset.filter(
                Q(description__icontains=search_term) |
                Q(category__name__icontains=search_term)
            )
        return queryset


class TransactionUpdateView(LoginRequiredMixin, UpdateView):
    model = Transaction
    fields = [
        "date",
        "description", 
        "category",
        "amount"
    ]
    template_name_suffix = "_update_form"
    
    # Disable the date field and amount from user
    def get_form(self, form_class = None):
        form = super().get_form(form_class)
        form.fields['date'].disabled = True
        form.fields['amount'].disabled = True
        return form
    
    def get_success_url(self):
        return reverse_lazy('finance_tracker:transaction-list')
    

class TransactionDeleteView(LoginRequiredMixin, DeleteView):
    model = Transaction
    

@login_required
def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.cleaned_data['file']
            file_content = uploaded_file.read().decode('utf-8') 
            csvfile =StringIO(file_content)
            reader = csv.DictReader(csvfile)
            
            transactions_to_create = []
            
            for row in reader:
                date_str = row.get('Date')
                description = row.get('Sub-description')
                amount_str = row.get('Amount')

                # Basic data cleaning and conversion
                if date_str:
                    try:
                        date = datetime.strptime(date_str, '%Y-%m-%d')  # Adjust format if needed
                    except ValueError:
                        print(f"Invalid date format for transaction: {description}")
                        continue

                if amount_str:
                    try:
                        amount = Decimal(amount_str.replace(',', ''))
                    except ValueError:
                        print(f"Invalid amount format for transaction: {description}")
                        continue

                # Categorize transactions
                if date and amount and description:
                    category_name = categorize_transaction(description)
                    category, created = Category.objects.get_or_create(name=category_name)

                    existing_transaction = Transaction.objects.filter(
                        date=date,
                        description=description,
                        amount=amount,
                        category=category,
                        owner=request.user
                    ).first()
                
                    if existing_transaction:
                        print("Duplicate transaction found, not saving.")
                    else:
                        transaction = Transaction(
                            date=date, 
                            description=description, 
                            amount=amount, 
                            category=category,
                            owner=request.user
                            )
                        transactions_to_create.append(transaction)

            Transaction.objects.bulk_create(transactions_to_create) # Bulk create transactions for efficiency
            print(f"{len(transactions_to_create)} transactions saved successfully.")

            return redirect("/finance_tracker/upload")
    else:
        form = UploadFileForm()
    return render(request, 'finance_tracker/upload.html', {'upload_form': form})


# ----- Category Expense Graph #1 ----- #
@login_required
def category_expenses_json(request):
    year = request.GET.get('year')
    if not year:
        year = datetime.today().year
    else:
        year = int(year)

    category_expenses = Transaction.objects.exclude(
        category__name='income').filter(
        owner=request.user,
        date__year=2024
    ).values('category__name').annotate(
        total_expense=Sum('amount')
    ).order_by('-total_expense')
    
    # Format the data for JSON response
    category_data = []
    for item in category_expenses:
        category_data.append({
            'category': item['category__name'], 
            'total_expense': str(item['total_expense'])
        })
        
    return JsonResponse(category_data, safe=False)




# ----- Income Graph #2 ----- #
@login_required
def income_total_json(request):
    year = request.GET.get('year')
    if not year:
        year = 2024
        # datetime.today().year
    else:
        year = int(year)

    # Filter income transactions for the year
    income_transactions_for_year = Transaction.objects.filter(
        owner=request.user,
        date__year = year,
        category__name = 'Income'
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
        month_name = datetime(year=year, month=month_number, day=1).strftime('%B')
        
        income_data.append({
            'month': month_name,
            'category': item['category__name'],
            'total_income': float(item['total_income'])
        })

    return JsonResponse(income_data, safe=False) # Return JSON response


# ----- Monthly Expense Graph #3 ----- #
@login_required
def monthly_expense_json(request):
    year = request.GET.get('year')
    if not year:
        year = datetime.today().year
    else:
        year = int(year)

    monthly_expenses = Transaction.objects.exclude(
        category__name='Income').filter(
        owner=request.user,
        date__year=2024
    ).annotate(
        month=TruncMonth('date')
    ).values('category__name', 'month').annotate(
        total_expense=Sum('amount')
    ).order_by('category__name', 'month')
    
    # Format the data for JSON response
    monthly_expense_data = []
    for item in monthly_expenses:
        monthly_expense_data.append({
            'month': item['month'].strftime('%b'), 
            'category': item['category__name'],
            'total_expense': float(item['total_expense'] or 0)
        })

    # monthly_expense_data = []
    # for item in monthly_expenses:
    #     month = item['month'].strftime('%b')
    #     category = item['category__name']
    #     total_expense = float(item['total_expense'] or 0)
    #     monthly_expense_data[month] = {'category': category}
        
    return JsonResponse(monthly_expense_data, safe=False)

