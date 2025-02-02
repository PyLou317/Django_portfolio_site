import pandas as pd
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import UploadFileForm
from .models import Transaction, Category
import os
import csv
from datetime import datetime
from decimal import Decimal
from django.conf import settings 


# Create your views here.
def finance_tracker_home(request):
    return render(request, 'finance_tracker/finance_tracker_home.html')


def upload_statement(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file'] 

            # Save the uploaded file temporarily
            file_name = f"uploaded_{file.name}" 
            file_path = os.path.join(settings.MEDIA_ROOT, file_name) 
            with open(file_path, 'wb+') as destination: 
                for chunk in file.chunks(): 
                    destination.write(chunk) 

            try:
                with open(file_path, 'r') as csvfile:
                    reader = csv.DictReader(csvfile) 
                    for row in reader:
                        try:
                            date_str = row.get('Date') 
                            description = row.get('Description') 
                            amount_str = row.get('Amount') 

                            # Data Cleaning and Conversion
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
                            
                            category_name = 'Other'
                            category, created = Category.objects.get_or_create(name=category_name) 
                            
                            # Create and Save Transaction
                            transaction = Transaction.objects.create(
                                date=date, 
                                description=description, 
                                amount=amount,
                                category=category
                                )
                            
                            # Print for debugging
                            print(f"Saving transaction: {transaction}") 

                        except Exception as e:
                            print(f"Error processing transaction: {e}") 

                # Remove the temporary file
                os.remove(file_path) 

                return HttpResponse('File uploaded and processed successfully!')

            except FileNotFoundError:
                return HttpResponse('Error: File not found.') 
            except Exception as e:
                return HttpResponse(f"An error occurred during processing: {e}") 

        else:
            return HttpResponse("Invalid file.")
    else:
        form = UploadFileForm()
    return render(request, 'finance_tracker/upload.html', {'form': form})