import os
import json
import csv
import pandas as pd
from io import StringIO, BytesIO


def load_categories():
    """
    Loads categories from the categories.json file.
    """
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'categories.json')
    with open(file_path, 'r') as f:
        return json.load(f)


def categorize_transaction(description: str):
    '''
    Categorize transaction based on keywords

    Args: 
        Transaction description: str

    Return: 
        Category: str
    '''
    categories = load_categories()  # Get the list of categories
    
    category_name = "Other"
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword.lower() in description.lower():
                category_name = category
                break
            
    return category_name.title()


def add_header(uploaded_file):
    '''
    Add header to CSV bank statement if CIBC

    Args: 
        Django file object

    Return: 
        Django file object
    '''
    col_names =['Date', 'Sub-description', 'Debit', 'Credit', 'Account']

    file_content = uploaded_file.read().decode('utf-8') 
    csvfile = StringIO(file_content) # creates a StringIO object to process it without saving on disk

    # for row in csvfile:
    #     print(row)

    try:
        df = pd.read_csv(csvfile, header=None, names=col_names)

        # If value empty fill with a zero to prevent NaN
        df['Debit'] = df['Debit'].fillna(0)
        df['Credit'] = df['Credit'].fillna(0)

        # Turn Debit and Credit columns into numbers
        df['Debit'] = pd.to_numeric(df['Debit'], errors='coerce')
        df['Credit'] = pd.to_numeric(df['Credit'], errors='coerce')

        # Merge Debit and Credit into new column, create a negative amount for expenses
        df['Amount'] = df['Credit'] - df['Debit']
        # Delete columns:
        df = df.drop(columns=['Debit', 'Credit', 'Account'])

        # Convert back into a Django object
        output = StringIO()
        df.to_csv(output, index=False, quoting=csv.QUOTE_NONNUMERIC) # Prevent issues with text fields.
        csv_string = output.getvalue()
        csv_bytes = csv_string.encode('utf-8')

        print(f'Header Added to file successfully')
        return BytesIO(csv_bytes)  # Return a BytesIO object
    
    except Exception as e:
        print(f'Error processing CSV: {e}')
        return False



if __name__ == "__main__":
    # category1 = categorize_transaction("Aerotek Inc")
    # print(category1)

    file = 'cibc_Octover.csv'
    add_header(file)
    

