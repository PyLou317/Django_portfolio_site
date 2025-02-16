from django.urls import path
from . import views
from finance_tracker.views import TransactionListView

app_name = 'finance_tracker'

urlpatterns = [
    path('', views.finance_tracker_home, name='home'),
    path('transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('transaction_table/', views.transaction_table, name='transaction-table'),
    path('upload/', views.upload_statement, name='file_upload'),
]
