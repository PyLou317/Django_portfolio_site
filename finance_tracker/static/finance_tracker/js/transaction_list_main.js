import { fetchData } from './fetch_transactions.js';
import { renderHTML } from './render_transaction_table.js';
import { showSpinner, hideSpinner, forceHideSpinner } from './spinner.js';
import { setupPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';
  const tableContent = document.querySelector('#transaction-table');
  const previousPageElement = document.querySelector('.previous-page');
  const nextPageElement = document.querySelector('.next-page');

  async function main(url = apiUrl) {
    showSpinner();
    tableContent.style.display = 'none';

    const data = await fetchData(url);

    hideSpinner();

    if (data) {
      renderHTML(data.results);
      console.log(data);
      setupPagination(data, main);
      tableContent.style.display = 'block';
    } else {
      forceHideSpinner();
    }
  }

  previousPageElement.addEventListener('click', (event) => {
      event.preventDefault();
      const previousUrl = document.querySelector('.previous-page a').href;
    if (previousUrl) {
        main(previousUrl);
    }
  });

  nextPageElement.addEventListener('click', (event) => {
      event.preventDefault();
      const nextUrl = document.querySelector('.next-page a').href;
    if (nextUrl) {
      main(nextUrl)
    }
  });

  main();
});
