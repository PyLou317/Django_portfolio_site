from django import forms
from .models import Transaction, Category
import csv
from datetime import datetime
from decimal import Decimal
from io import StringIO
from .utils import categorize_transaction

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Field, Row, Column

class UploadFileForm(forms.Form):        
    file = forms.FileField(required=True, help_text="Please upload your bank statement here (CSV file)")

    # def save(self):
    #     uploaded_file = self.cleaned_data['file']

    #     # Process the uploaded CSV file
    #     transactions = []
    #     try:
    #         file_content = uploaded_file.read().decode('utf-8') 
    #         with StringIO(file_content) as csvfile:
    #             reader = csv.DictReader(csvfile)
    #             for row in reader:
    #                 date_str = row.get('Date')
    #                 description = row.get('Sub-description')
    #                 amount_str = row.get('Amount')

    #                 # Basic data cleaning and conversion
    #                 if date_str:
    #                     try:
    #                         date = datetime.strptime(date_str, '%Y-%m-%d')  # Adjust format if needed
    #                     except ValueError:
    #                         print(f"Invalid date format for transaction: {description}")
    #                         continue

    #                 if amount_str:
    #                     try:
    #                         amount = Decimal(amount_str.replace(',', ''))
    #                     except ValueError:
    #                         print(f"Invalid amount format for transaction: {description}")
    #                         continue

    #                 # Categorize transactions
    #                 category_name = categorize_transaction(description)
    #                 category, created = Category.objects.get_or_create(name=category_name)

    #                 existing_transaction = Transaction.objects.filter(
    #                     date=date,
    #                     description=description,
    #                     amount=amount,
    #                     category=category
    #                 ).first()
                    
    #                 if existing_transaction:
    #                     print("Duplicate transaction found, not saving.")
    #                 else:
    #                     transaction = Transaction(date=date, description=description, amount=amount, category=category)
    #                     transactions.append(transaction)

    #     except Exception as e:
    #         raise forms.ValidationError(f"An error occurred during processing: {e}")

        # # Save transactions to the database
        # for transaction in transactions:
        #     transaction.save()
        #     print("Transaction saved successfully.")
        

        # Form Helper (crispy)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = "upload_form"
        self.helper.form_method = "post"
        self.helper.form_class = "mt-5"
        self.helper.label_class = 'visually-hidden'
        self.helper.field_class = '' 
        
        self.helper.layout = Layout(
            Row(
                Column(Field('file'), css_class='form-group col-md-9'), # 'col-md-12' to take full width in the row
                Column(Submit('submit', 'Upload', css_class='btn-secondar'), css_class='form-group col-md-3 d-flex align-self-start justify-content-center'),
                css_class='form-row' # Add form-row for Bootstrap row
                ),
    
        )