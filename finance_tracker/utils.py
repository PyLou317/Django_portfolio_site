import os
import json

def load_categories():
    """Loads categories from the categories.json file."""
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'categories.json')
    with open(file_path, 'r') as f:
        return json.load(f)


def categorize_transaction(description):
    categories = load_categories()  # Get the list of categories
    
    category_name = "Other"
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword.lower() in description.lower():
                category_name = category
                break
            
    return category_name.title()

if __name__ == "__main__":
    category1 = categorize_transaction("Aerotek Inc")
    print(category1)
    

