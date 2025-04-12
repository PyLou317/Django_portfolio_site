'use strict';

const transactionRowContainer = document.querySelector('[transaction-row-container]');
const transactionRowTemplate = document.querySelector('[transaction-row-template]');

export function renderHTML(transactionData) {
  transactionData.results.map((data) => {
    let transactionDate = data.date;
    let amountRaw = parseFloat(data.amount);
    let amountTotal = isNaN(amountRaw) ? 'Error' : amountRaw.toFixed(2);
    let transactionDescription = data.description;
    let transactionCategory = data.category_name;
      let transactionNotes = data.notes;
      
      let previousUrl = transactionData.previous
      let currentPage = transactionData.previous
      let nextUrl = transactionData.previous

    // Format the number with commas
    const formattedAmountTotal =
      '$ ' +
      Number(amountTotal).toLocaleString('en-CA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

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
}
