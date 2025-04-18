import { fetchData } from './fetch_transactions.js';
import { renderHTML, renderStatsBar } from './UI.js';
import { showSpinner, hideSpinner, forceHideSpinner } from '../spinner.js';
import { setupPagination } from './pagination.js';
import { getCategories } from '../category_filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = '/finance_tracker/transactions_api/';
  const tableContent = document.querySelector('[transaction-row-container]');
  const previousPageBtn = document.querySelector(
    '.previous-page a.previousUrl'
  );
  const nextPageBtn = document.querySelector('.next-page a.nextUrl');
  const searchInput = document.querySelector('[transaction-search-bar]');

  tableContent.classList.add('visually-hidden');

  // Debounce function (from lodash)
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  async function main(url = apiUrl) {
    try {
      const data = await fetchData(url);
      getCategories(data.categories);
      hideSpinner();
      renderStatsBar(data.stats);
      renderHTML(data.results);

      if (renderHTML) {
        tableContent.classList.remove('visually-hidden');
      }
      setupPagination(data, main);

      const categoryFilters = document.querySelectorAll(
        '.category-filter-badge'
      );
      const clearFilterBtn = document.querySelector('.clearFilterBtn');

      categoryFilters.forEach((button) => {
        button.addEventListener('click', async () => {
          const categoryName = button.textContent;
          const filterBtn = document.querySelector('.filter-badge');
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
            if (clearFilterBtn) {
              clearFilterBtn.classList.remove('hide');
              clearFilterBtn.addEventListener('click', () => {
                main();
                categoryFilters.forEach((btn) => {
                  btn.style.backgroundColor = '';
                  btn.style.backgroundImage = '';
                });
                clearFilterBtn.classList.add('hide');
              });
            }
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

  const handleSearch = debounce((event) => {
    const searchTerm = event.target.value.trim();
    const searchUrl = searchTerm ? `${apiUrl}?search=${searchTerm}` : apiUrl;
    main(searchUrl);
  }, 300);

  searchInput.addEventListener('input', handleSearch);

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
