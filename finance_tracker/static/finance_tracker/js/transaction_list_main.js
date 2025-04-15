import { fetchData } from './fetch_transactions.js';
import { renderHTML } from './render_transaction_table.js';
import { showSpinner, hideSpinner, forceHideSpinner } from './spinner.js';
import { setupPagination } from './pagination.js';
import { renderStatsBar } from './stats_bar.js';
import { filterFunction, getCategories } from './category_filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';
  const tableContent = document.querySelector('[transaction-row-container]');
  const previousPageBtn = document.querySelector(
    '.previous-page a.previousUrl'
  );
  const nextPageBtn = document.querySelector('.next-page a.nextUrl');

  tableContent.classList.add('visually-hidden');

  async function main(url = apiUrl) {
    filterFunction();
    showSpinner();

    const data = await fetchData(url);
    getCategories(data.categories);

    hideSpinner();

    try {
      renderStatsBar(data.stats);
      renderHTML(data.results);
      if (renderHTML) {
        tableContent.classList.remove('visually-hidden');
      }
      setupPagination(data, main);

      const categoryFilters = document.querySelectorAll(
        '.category-filter-badge'
      );
      categoryFilters.forEach((button) => {
        button.addEventListener('click', async () => {
          const categoryName = button.textContent;
          const filterBtn = document.querySelector('.filter-badge');
          const primaryColor =
            getComputedStyle(button).getPropertyValue('--primary-color');
          const gradientColor =
            getComputedStyle(filterBtn).getPropertyValue('--gradient-color');
            
            categoryFilters.forEach((btn) => {
                btn.style.backgroundColor = '';
                btn.style.backgroundImage = '';
            });
            button.style.backgroundImage = gradientColor;


          const params = new URLSearchParams();
          params.append('category', categoryName);
          const filterUrl = `${apiUrl}?${params.toString()}`;

          try {
            const filterData = await fetchData(filterUrl);
            renderHTML(filterData.results);
            renderStatsBar(filterData.stats);
            setupPagination(filterData, main);
            hideSpinner();
          } catch (error) {
            console.log('Error fetching filtered data:', error);
            forceHideSpinner();
          }
        });
      });
    } catch (error) {
      console.log('Error fetching Data:', error);
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
