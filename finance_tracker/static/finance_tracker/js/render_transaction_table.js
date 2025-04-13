'use strict';

const transactionRowContainer = document.querySelector(
  '[transaction-row-container]'
);
const transactionRowTemplate = document.querySelector(
  '[transaction-row-template]'
);

export function renderHTML(transactionData) {
  transactionRowContainer.innerHTML = '';

  transactionData.forEach((data) => {
    let transactionDate = data.date;
    let amountRaw = parseFloat(data.amount);
    let amountTotal = isNaN(amountRaw) ? 'Error' : amountRaw.toFixed(2);
    let transactionDescription = data.description;
    let transactionCategory = data.category_name;
    let transactionNotes = data.notes;
    let transaction_id = data.id;

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
    const transactionEditBtn = card.querySelector('.transaction-action .edit-link');
    const transactionDeleteBtn = card.querySelector('.transaction-action .delete-link');
      
      const editBaseUrl = transactionEditBtn.parentElement.dataset.editUrl;
      const deleteBaseUrl = transactionDeleteBtn.parentElement.dataset.deleteUrl;

    date.textContent = transactionDate;
    amount.textContent = formattedAmountTotal;
    category.textContent = transactionCategory;
      description.textContent = transactionDescription;
      
    transactionEditBtn.parentElement.href = `${editBaseUrl.slice(0, editBaseUrl.lastIndexOf('0'))}${transaction_id}${editBaseUrl.slice(editBaseUrl.lastIndexOf('0') + 1)}`
    transactionDeleteBtn.parentElement.href = `${deleteBaseUrl.slice(0, deleteBaseUrl.lastIndexOf('0'))}${transaction_id}${deleteBaseUrl.slice(deleteBaseUrl.lastIndexOf('0') + 1)}`

      
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
