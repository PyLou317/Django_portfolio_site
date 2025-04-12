import { fetchData } from './fetch_transactions.js';
import { renderHTML } from './render_transaction_table.js';
import { showSpinner, hideSpinner, forceHideSpinner } from './spinner.js';
import { showPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';
  const tableContent = document.querySelector('#transaction-table');

  async function main() {
    showSpinner();
    tableContent.style.display = 'none';

    const data = await fetchData(apiUrl);

    hideSpinner();

    if (data) {
      // Process the data
      renderHTML(data);
      console.log(data);
      showPagination();
      tableContent.style.display = 'block';
    } else {
      forceHideSpinner();
    }
  }

  main();
});
