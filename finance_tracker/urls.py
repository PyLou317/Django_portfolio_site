from django.urls import path, reverse_lazy
from . import views

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='home'),
    path('dashboard/', views.finance_tracker_dashboard, name='dashboard'),
    path('transactions/', views.TransactionListView.as_view(), name='transaction-list'),
    path('transactions/api/', views.TransactionListAPI.as_view(), name='transaction-list_api'),
    path('categories/', views.CategoryList.as_view(), name='categories'),
    path('components/upload-notify/', views.upload_notify_component, name='upload_notify_component'),
    path('upload/', views.upload_statement, name='file_upload'),
    path('transactions/<pk>/update/', views.TransactionUpdateView.as_view(success_url = reverse_lazy('transaction-list')), name='transaction_update'),
    path('transactions/<pk>/delete/', views.TransactionDeleteView.as_view(success_url = reverse_lazy('transaction-list')), name='transaction_delete'),
    # API's
    # path('transactions_json/', views.transaction_list_json, name='transaction_list_json'),
    path('transactions_api/', views.transactions_api, name='transactions_api'),
    path('category_expense_json/', views.category_expenses_json, name='category_expense_json'),
    path('monthly_expense_json/', views.monthly_expense_json, name='monthly_expense_json'),
    path('income_total_json/', views.income_total_json, name='income_total_json'),
]
