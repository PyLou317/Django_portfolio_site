document.addEventListener('DOMContentLoaded', () => { // Load DOM first
    const transactionsJson = document.getElementById('transactions-data').textContent;

    if (transactionsJson.trim() === "") { // Check if empty or just whitespace
        console.error("No transaction data received from server!");
        // Handle the case where there is no data, e.g., display a message.
        return; // Stop further execution to prevent error.
    }
    
    const transactions = JSON.parse(transactionsJson);

    console.log("Chart Data:", transactions);
});