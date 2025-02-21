from django.urls import path
from . import views
from finance_tracker.views import TransactionListView

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='home'),
    path('dashboard/', views.finance_tracker_dashboard, name='dashboard'),
    path('transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('upload/', views.upload_statement, name='file_upload'),
    # API's
    path('transactions_json/', views.transaction_list_json, name='transaction_list_json'),
    # path('transaction_table/', views.transaction_table, name='transaction-table'),
]
