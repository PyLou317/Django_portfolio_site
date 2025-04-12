import { fetchData } from './fetch_transactions.js';

const apiUrl = '/finance_tracker/transactions_api/'

async function main() {
    const data = await fetchData(apiUrl);
    if (data) {
      // Process the data
      console.log(data);
    }
  }
  
  main();