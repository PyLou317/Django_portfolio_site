'use_strict';

export function renderStatsBar(data) {
    const totalElement = document.querySelector('#stats-total')
    const dateRangeElement = document.querySelector('#date-range')
    const totalTransactionsElement = document.querySelector('#transaction-count')
    
    const dateMin = data.min_date
    const dateMax = data.max_date

    const formattedAmountTotal =
      '$ ' +
      Number(data.total_amount).toLocaleString('en-CA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    
    const formattedTotalTransactions = Number(data.total_transactions).toLocaleString('en-CA')
    
    dateRangeElement.textContent = `${dateMin} - ${dateMax}`;
    totalElement.textContent = formattedAmountTotal;
    totalTransactionsElement.textContent = formattedTotalTransactions;
}