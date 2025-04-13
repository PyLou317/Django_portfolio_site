import { fetchData } from './fetch_transactions.js';
import { renderHTML } from './render_transaction_table.js';
import { showSpinner, hideSpinner, forceHideSpinner } from './spinner.js';
import { setupPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';
  const tableContent = document.querySelector('#transaction-table');
  const previousPageBtn = document.querySelector('.previous-page a.previousUrl');
  const nextPageBtn = document.querySelector('.next-page a.nextUrl');

  tableContent.classList.add('force-hide');

  async function main(url = apiUrl) {
    showSpinner();

    const data = await fetchData(url);

    hideSpinner();

    if (data) {
      renderHTML(data.results);
      console.log(data);
      setupPagination(data, main);
      tableContent.classList.remove('force-hide');
    } else {
      forceHideSpinner();
    }
  }

  previousPageBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (previousPageBtn.parentElement.classList.contains('disabled')) {
      return;
    }
    const previousUrl = previousPageBtn.href;
    if (previousUrl) {
      main(previousUrl);
    }
  });

  nextPageBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (nextPageBtn.parentElement.classList.contains('disabled')) {
      return;
    }
    const nextUrl = nextPageBtn.href;
    if (nextUrl) {
      main(nextUrl);
    }
  });

  main();
});
