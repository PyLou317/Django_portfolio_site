import { fetchData } from './fetch_transactions.js';
import { renderHTML } from './render_transaction_table.js';
import { showSpinner, hideSpinner, forceHideSpinner } from './spinner.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';

  async function main() {
      showSpinner();
      console.log('show spinner main');

    const data = await fetchData(apiUrl);

      hideSpinner();
      console.log('hide spinner main');
    
    if (data) {
        // Process the data
      console.log(data);
      renderHTML(data);
    } else {
      forceHideSpinner();
    }
  }

  main();
});
