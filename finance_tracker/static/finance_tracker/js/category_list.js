'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.querySelector('.loader-div')
    const pageData = document.querySelector('.page-content')

    // Initially hide content
    if (pageData) {
        pageData.style.display = 'none';
    }
    
    fetch('/finance_tracker/category_expense_json/')
        .then((resp) => resp.json())
        .then((categoryData) => {
        console.log('Fetched data:', categoryData);
        
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
        
        console.log("Sorted data by category:", sortedData);


        sortedData.forEach((data) => {
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

            // TODO add number of transaction to category card
            // TODO link each card to category detail view
        const markup =`
                <div class="card rounded-3 border-0 bg-light shadow-sm">
                    <div class="card-body p-3">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="d-flex align-items-center">
                            <div class="category-list-icon bg text-white rounded-circle d-flex align-items-center justify-content-center me-2">
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
                        <div class="row">
                            <div class="col-6">
                                <span class="text-muted">Transactions:</span>
                            </div>
                            <div class="col-6 text-end">
                                <h5 class="mb-0">67</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <span class="text-muted">Total:</span>
                            </div>
                            <div class="col-6 text-end">
                                <h5 class="mb-0">${formattedExpTotal}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                `;

        document
            .querySelector('#category-card')
            .insertAdjacentHTML('beforeend', markup);
            
            // Introduce a fixed delay before hiding the spinner
            setTimeout(() => {
                if (spinner) {
                    spinner.style.display = 'none';
                }
                if (pageData) {
                    pageData.style.display = 'block'; // Show the content
                }
            }, 1000); // Delay of 1000 milliseconds (1 second)
        })
        
            .catch((error) => {
        console.error("Error fetching data:", error);
        if (spinner) {
            spinner.style.display = 'none'; // Hide spinner on error as well
        }
        if (pageData) {
            pageData.style.display = 'block'; // Show any error message or fallback
        }
    });
});
    
});
    

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
