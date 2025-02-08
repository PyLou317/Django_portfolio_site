import os
import json

def load_categories():
    """Loads categories from the categories.json file."""
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'categories.json')
    with open(file_path, 'r') as f:
        return json.load(f)


def categorize_transaction(description):
    """
    Categorizes a transaction based on keywords.

    Args:
        description: The description of the transaction.

    Returns:
        The category of the transaction.
    """
    categories = load_categories()  # Get the list of categories
    
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword.lower() in description.lower():
                return category
    return "other"


if __name__ == "__main__":
    category = categorize_transaction("barber")
    print(category)
    

