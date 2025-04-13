'use_strict';

export function renderStatsBar(data) {
    const totalElement = document.querySelector('#stats-total')

    const formattedAmountTotal =
      '$ ' +
      Number(data.total_amount).toLocaleString('en-CA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
    totalElement.textContent = formattedAmountTotal;
}