from django.urls import path, reverse_lazy
from . import views

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='home'),
    path('dashboard/', views.finance_tracker_dashboard, name='dashboard'),
    path('transactions/', views.TransactionListView.as_view(), name='transaction-list'),
    path('categories/', views.CategoryList.as_view(), name='categories'),
    path('category/detail/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('components/upload-notify/', views.upload_notify_component, name='upload_notify_component'),
    path('upload/', views.upload_statement, name='file_upload'),
    path('transactions/<int:pk>/update/', views.TransactionUpdateView.as_view(), name='edit_transaction'),
    path('transactions/<int:pk>/delete/', views.TransactionDeleteView.as_view(), name='delete_transaction'),
    # API's
    # path('transactions_json/', views.transaction_list_json, name='transaction_list_json'),
    path('transactions_api/', views.TransactionListAPIView.as_view(), name='transactions_api'),
    path('transactions_api/<int:pk>/', views.TransactionDetailAPIView.as_view(), name='transactions_detail_api'),
    path('category_api/', views.CategoryListAPIView.as_view(), name='category_api'),
    path('category_api/<int:pk>', views.CategoryDetailAPIView.as_view(), name='category_detail_api'),
    path('category_expense_json/', views.category_expenses_json, name='category_expense_json'),
    path('monthly_expense_json/', views.monthly_expense_json, name='monthly_expense_json'),
    path('income_total_json/', views.income_total_json, name='income_total_json'),
]
