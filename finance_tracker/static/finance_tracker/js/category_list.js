"use strict";

document.addEventListener('DOMContentLoaded', () => {

    fetch('/finance_tracker/category_expense_json/')
        .then(resp => resp.json())
        .then(categoryData => {
            console.log('Fetched data:', categoryData);
            categoryData.forEach(data => {
                let expTotalRaw = parseFloat(data.total_expense);
                let expTotal = isNaN(expTotalRaw) ? 'Error' : expTotalRaw.toFixed(2);
                
                // Format the number with commas
                const formattedExpTotal = "$ " + Number(expTotal).toLocaleString('en-CA', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });

                let extraInfo = '';
                if (expTotalRaw < -5000) {
                    extraInfo = '<span class="text-warning ms-1">(High Expense)</span>';
                };

                const markup = `
                <div class="card rounded-3 border-0 bg-light shadow-sm">
                    <div class="card-body p-3">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 30px; height: 30px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet" viewBox="0 0 16 16">
                                <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7zm0 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2z"/>
                            </svg>
                            </div>
                            <div>
                            <h6 class="mb-0">${data.category}</h6>
                            <small class="text-muted">${extraInfo}</small>
                            
                            </div>
                        </div>
                        <div class="ms-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted">Balance:</span>
                        <h5 class="mb-0">${formattedExpTotal}</h5>
                        </div>
                    </div>
                </div>
                `;

                document.querySelector('#category-card').insertAdjacentHTML('beforeend', markup)
            })
        
            
        })
        .catch(error => console.log(error));
})

{/* <div class="col-sm-12 col-md-6 mb-2">
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
</div>   */}

                