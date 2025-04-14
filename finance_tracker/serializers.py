from .models import Transaction, Category
from rest_framework import serializers

from django.db.models import Sum

        
class CategorySerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField()
    transaction_count = serializers.SerializerMethodField()
    transaction_amount_total = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'transaction_amount_total',
            'transaction_count',
            'transactions'
        ]
    
    def get_transaction_amount_total(self, obj):
        result =  Transaction.objects.filter(category=obj).aggregate(Sum('amount'))
        return result['amount__sum']
        
    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(category=obj)
        transaction_serializer = TransactionSerializer(transactions, many=True)
        return transaction_serializer.data
    
    def get_transaction_count(self, obj):
        return Transaction.objects.filter(category=obj).count()
    
    

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
        
    class Meta:
        model = Transaction
        fields = [
            'id',
            'date',
            'description',
            'amount', 
            'category_name', 
            'notes'
        ]
        
    def validate_amount(self, value):
        if value == 0:
            raise serializers.ValidationError(
                'Amount cannot be zero'
            )
        return value   




        