from django import forms
from .models import Transaction, Category
import csv
from datetime import datetime
from decimal import Decimal
from io import StringIO
from .utils import categorize_transaction

class UploadFileForm(forms.Form):
    file = forms.FileField()

    def save(self):
        uploaded_file = self.cleaned_data['file']

        # Process the uploaded CSV file
        transactions = []
        try:
            file_content = uploaded_file.read().decode('utf-8') 
            with StringIO(file_content) as csvfile:
                reader = csv.DictReader(csvfile)
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

                    # Basic categorization (replace with more sophisticated logic)
                    category_name = categorize_transaction(description)

                    category, created = Category.objects.get_or_create(name=category_name)

                    transaction = Transaction(date=date, description=description, amount=amount, category=category)
                    transactions.append(transaction)

        except Exception as e:
            raise forms.ValidationError(f"An error occurred during processing: {e}")

        # Save transactions to the database
        for transaction in transactions:
            transaction.save()

        return None