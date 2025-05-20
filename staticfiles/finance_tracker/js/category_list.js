'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const categoryCardTemplate = document.querySelector('[category-card-template]');
  const categoryCardContainer = document.querySelector('#category-card-container');
  const spinner = document.querySelector('.loader-div');
  const pageData = document.querySelector('.page-content');
  const noDataHTMLFile = '/finance_tracker/components/upload-notify/';
  const searchInput = document.querySelector('[data-search]');
  let searched_categories = [];

  // Initially hide content
  if (pageData) {
    pageData.style.display = 'none';
  }

  fetch('/finance_tracker/category_expense_json/')
    .then((resp) => resp.json())
    .then((categoryData) => {
      if (categoryData && categoryData.length > 0) {
        const sortedData = categoryData.sort(function (a, b) {
          // Ignore case
          const categoryA = a.category.toUpperCase();
          const categoryB = b.category.toUpperCase();
          if (categoryA < categoryB) {
            return -1;
          }
          if (categoryA > categoryB) {
            return 1;
          }
          return 0;
        });

        searched_categories = sortedData.map((data) => {
          let expTotalRaw = parseFloat(data.total_expense);
          let expTotal = isNaN(expTotalRaw) ? 'Error' : expTotalRaw.toFixed(2);
          const transactionCount = parseInt(data.transaction_count);

          // Format the number with commas
          const formattedExpTotal =
            '$ ' +
            Number(expTotal).toLocaleString('en-CA', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

          let extraInfo = '';
          if (expTotalRaw < -5000) {
            extraInfo = '<span class="text-warning ms-1">(High Expense)</span>';
          }

          const card = categoryCardTemplate.content.cloneNode(true).children[0];
          const categoryName = card.querySelector('[data-category]');
          const expenseTotal = card.querySelector('[expense-total]');
          const countTotal = card.querySelector('[transaction-total]');

          categoryName.textContent = data.category;
          expenseTotal.textContent = formattedExpTotal;
          countTotal.textContent = transactionCount;

          categoryCardContainer.append(card);

          return {
            name: data.category,
            expense_total: formattedExpTotal,
            transaction_count: transactionCount,
            element: card,
          };
        });
      } else {
        fetch(noDataHTMLFile)
          .then((resp) => resp.text())
          .then((html) => {
            pageData.insertAdjacentHTML('beforeend', html);
          });
      }

      // Delay for spinner
      setTimeout(() => {
        if (spinner) {
          spinner.style.display = 'none';
        }
        if (pageData) {
          pageData.style.display = 'block'; // Show the content
        }
      }, 1000);
        
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        searched_categories.forEach((category) => {
        //   console.log(value);
          const isVisible =
            category.name.toLowerCase().includes(value) ||
            category.expense_total.includes(value);
          category.element.classList.toggle('hide', !isVisible);
        });
      });
    })

    .catch((error) => {
      console.error('Error fetching data:', error);
      if (spinner) {
        spinner.style.display = 'none'; // Hide spinner on error as well
      }
      if (pageData) {
        pageData.style.display = 'block'; // Show any error message or fallback
      }
    });
});
