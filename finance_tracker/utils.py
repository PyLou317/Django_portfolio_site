import os
import json
import csv
import pandas as pd


def load_categories():
    """
    Loads categories from the categories.json file.
    """
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'categories.json')
    with open(file_path, 'r') as f:
        return json.load(f)


def categorize_transaction(description: str):
    categories = load_categories()  # Get the list of categories
    
    category_name = "Other"
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword.lower() in description.lower():
                category_name = category
                break
            
    return category_name.title()


def add_header(filename):
    '''
    Add header to CSV bank statement if CIBC

    Args: 
        filename, as csv file that is already a StringIO object and csv.DictReader

    Return: 
        filename
    '''
    col_names =['Date', 'Sub-description', 'Debit', 'Credit', 'Account']

    try:
        df = pd.read_csv(filename, header=None, names=col_names)

        # If cell empty fill with a zero to prevent NaN
        df['Debit'] = df['Debit'].fillna(0)
        df['Credit'] = df['Credit'].fillna(0)

        # Turn Debit and Credit columns into numbers
        df['Debit'] = pd.to_numeric(df['Debit'], errors='coerce')
        df['Credit'] = pd.to_numeric(df['Credit'], errors='coerce')

        # Merge Debit and Credit into new column:
        df['Amount'] = df['Debit'] - df['Credit']
        # Delete columns:
        df = df.drop(columns=['Debit', 'Credit', 'Account'])

        df.to_csv(filename, index=False)

        file = df

        print(df[:5])
        return file
    except Exception as e:
        print(f'Error processing CSV: {e}')
        return False
    ...



if __name__ == "__main__":
    # category1 = categorize_transaction("Aerotek Inc")
    # print(category1)

    file = 'cibc_January.csv'
    add_header(file)
    

