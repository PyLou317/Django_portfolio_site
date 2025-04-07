'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const transactionRowContainer = document.querySelector(
    '[transaction-row-container]'
  );
  const transactionRowTemplate = document.querySelector(
    '[transaction-row-template]'
  );

  const spinner = document.querySelector('.loader-div');
  const pageData = document.querySelector('#page-content');

  const noDataHTMLFile = '/finance_tracker/components/upload-notify/';
  const searchInput = document.querySelector('[transaction-search-bar]');

  let searched_transactions = [];

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    searched_transactions.forEach((transaction) => {
        const isVisible =
            transaction.description.toLowerCase().includes(value) ||
            transaction.amount.includes(value) ||
            transaction.category.toLowerCase().includes(value);
            
      transaction.element.classList.toggle('hide', !isVisible);
    });
  });

  // Initially hide content
  if (pageData) {
    pageData.style.display = 'none';
  }

  fetch('/finance_tracker/transactions_api/')
    .then((resp) => resp.json())
    .then((transactionData) => {
      console.log(transactionData);
      if (transactionData && transactionData.length > 0) {
        searched_transactions = transactionData.map((data) => {
            let transactionDate = data.date;
            let amountRaw = parseFloat(data.amount);
            let amountTotal = isNaN(amountRaw) ? 'Error' : amountRaw.toFixed(2);
            let transactionDescription = data.description;
            let transactionCategory = data.category;
            let transactionNotes = data.notes;

          // Format the number with commas
          const formattedAmountTotal =
            '$ ' +
            Number(amountTotal).toLocaleString('en-CA', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

        //   let extraInfo = '';
        //   if (expTotalRaw < -5000) {
        //     extraInfo = '<span class="text-warning ms-1">(High Expense)</span>';
        //   }

          const card = transactionRowTemplate.content.cloneNode(true).children[0];
          const date = card.querySelector('[transaction-desktop-date]');
          const amount = card.querySelector('[transaction-amount]');
          const category = card.querySelector('[transaction-category]');
          const description = card.querySelector('[transaction-description]');

          date.textContent = transactionDate;
          amount.textContent = formattedAmountTotal;
          category.textContent = transactionCategory;
          description.textContent = transactionDescription;

          transactionRowContainer.append(card);

          return {
            date: transactionDate,
            amount: formattedAmountTotal,
            category: transactionCategory,
            description: transactionDescription,
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
