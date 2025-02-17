document.addEventListener('DOMContentLoaded', () => {
    const totalExpensesChart = document.getElementById('total-expenses-chart')
    const monthlyExpensesChart = document.getElementById('monthly-expenses-chart')
    const totalIncomeChart = document.getElementById('total-income-chart')

    
    new Chart(totalExpensesChart, {
        type: 'line',
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
    })
})   