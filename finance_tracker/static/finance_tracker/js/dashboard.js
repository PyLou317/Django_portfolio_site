document.addEventListener('DOMContentLoaded', () => {
    const totalExpensesChart = document.getElementById('total-expense-chart')
    const monthlyIncomeChart = document.getElementById('monthly-income-chart')
    const totalIncomeChart = document.getElementById('total-income-chart')
    const expenseByMonthChart = document.getElementById('expense-by-month-chart')
    
    
    fetch('/finance_tracker/category_expense_json/')
        .then(resp => resp.json())
        .then(categoryExpensesData => { // 'transactionsData' is now the JSON list from Django
            console.log('Fetched categoryExpenseData:', categoryExpensesData);
            
            // 1. Prepare data for Chart.js
            const categoryLabels = categoryExpensesData.map(item => item.category); // Extract category names
            const categoryExpenseTotals = categoryExpensesData.map(item => parseFloat(item.total_expense)); // Extract total expenses (convert to number)
    
    
            new Chart(totalExpensesChart, {
                type: 'bar',
                data: {
                    labels: categoryLabels,
                    datasets: [{
                        label: 'Total Expenses per Category',
                        data: categoryExpenseTotals,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(52, 9, 207, 0.8)',
                        ],
                        borderColor: [ // Optional: Customize border colors
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgb(33, 26, 165)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Expenses ($)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Category'
                            }
                        }
                    }
                }
            });
        

            fetch('/finance_tracker/income_total_json/')
                .then(resp => resp.json())
                .then(monthlyIncomeData => {
                    console.log('Fetched monthlyIncomeData:', monthlyIncomeData);

                    const categoryLabels = monthlyIncomeData.map(item => item.month);
                    const monthlyIncomeTotals = monthlyIncomeData.map(item => parseFloat(item.total_income));


                    const monthlyExpense = new Chart(monthlyIncomeChart, {
                        type: 'bar',
                        data: {
                            labels: categoryLabels,
                            datasets: [{
                                label: 'Total Income',
                                data: monthlyIncomeTotals,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
    
                    const expenseByMonth = new Chart(expenseByMonthChart, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [{
                                label: 'Expenses',
                                data: [65, 59, 80, 81, 56, 55, 40],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                });
        })
})
