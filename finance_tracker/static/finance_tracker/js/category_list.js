'use strict';

document.addEventListener('DOMContentLoaded', () => {
  fetch('/finance_tracker/category_expense_json/')
    .then((resp) => resp.json())
    .then((categoryData) => {
      console.log('Fetched data:', categoryData);
      categoryData.forEach((data) => {
        let expTotalRaw = parseFloat(data.total_expense);
        let expTotal = isNaN(expTotalRaw) ? 'Error' : expTotalRaw.toFixed(2);

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

        const markup =`
                <div class="card rounded-3 border-0 bg-light shadow-sm">
                    <div class="card-body p-3">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 30px; height: 30px;">
                                <i class="bi bi-cash-coin"></i>
                            </div>
                            <div>
                            <h6 class="mb-0">${data.category}</h6>
                            <small class="text-muted">${extraInfo}</small>
                            
                            </div>
                        </div>
                        <div class="ms-auto">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted">Balance:</span>
                        <h5 class="mb-0">${formattedExpTotal}</h5>
                        </div>
                    </div>
                </div>
                `;

        document
          .querySelector('#category-card')
          .insertAdjacentHTML('beforeend', markup);
      });
    })
    .catch((error) => console.log(error));
});

{
  /* <div class="col-sm-12 col-md-6 mb-2">
    <div class="card text-start">
        <div class="card-body bg-light p-2">
            <div class="row d-flex align-items-center justify-content-between">
                <div class="col pe-2">
                    <span class="fw-bold">${data.category}:</span>
                    ${extraInfo}
                </div>
                    <div class="col text-end">
                            <span id="cat-number-badge" class="fw-bold text-danger">${formattedExpTotal}</span>
                    </div>
            </div>
        </div>
    </div>
</div>   */
}
