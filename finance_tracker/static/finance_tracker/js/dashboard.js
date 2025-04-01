"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const totalExpensesChart = document.getElementById('total-expense-chart');
    const monthlyIncomeChart = document.getElementById('monthly-income-chart');
    const totalIncomeChart = document.getElementById('total-income-chart');
    const expenseByMonthChart = document.getElementById('expense-by-month-chart');
    let myChart;


    // ------- Total Expense Chart ------- //
    fetch('/finance_tracker/category_expense_json/')
        .then(resp => resp.json())
        .then(categoryExpensesData => { // 'transactionsData' is now the JSON list from Django
            console.log('Fetched categoryExpenseData:', categoryExpensesData);

            const categoryLabels = categoryExpensesData.map(item => item.category);
            const categoryExpenseTotals = categoryExpensesData.map(item => parseFloat(item.total_expense));

            const backgroundColors = [ // Define enough colors for your categories
                'rgba(255, 99, 132, 0.8)',   // Light Red
                'rgba(54, 162, 235, 0.8)',  // Light Blue
                'rgba(255, 206, 86, 0.8)',  // Light Yellow
                'rgba(75, 192, 192, 0.8)',  // Light Teal
                'rgba(153, 102, 255, 0.8)', // Light Purple
                'rgba(255, 159, 64, 0.8)',  // Light Orange
                'rgba(52, 9, 207, 0.8)',    // Dark Blue
                'rgba(201, 203, 207, 0.8)', // Light Gray
                'rgba(144, 238, 144, 0.8)', // Light Green (LightSeaGreen)
                'rgba(255, 255, 0, 0.8)',   // Yellow
                'rgba(0, 255, 255, 0.8)',   // Cyan
                'rgba(128, 128, 128, 0.8)', // Gray
                'rgba(173, 216, 230, 0.8)', // Light Blue (LightSkyBlue)
                'rgba(255, 228, 196, 0.8)', // Bisque
                'rgba(224, 255, 255, 0.8)', // Light Cyan
                'rgba(255, 218, 185, 0.8)', // Light Goldenrod Yellow
                'rgba(211, 211, 211, 0.8)', // Light Gray (LightSteelGray)
                // ... add more colors if needed ...
            ];

            new Chart(totalExpensesChart, {
                type: 'doughnut',
                data: {
                    labels: categoryLabels, // Use category labels for x-axis
                    datasets: [{
                        label: 'Total Expenses per Category', // Dataset label (for chart title/description)
                        data: categoryExpenseTotals, // Expense totals for all categories (single dataset)
                        backgroundColor: backgroundColors, // Array of colors - MATCHING CATEGORY ORDER
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    
                }
            });
        });


    // ------- Monthly Income Chart ------- //
    fetch('/finance_tracker/income_total_json/')
        .then(resp => resp.json())
        .then(monthlyIncomeData => {
            console.log('Fetched monthlyIncomeData:', monthlyIncomeData);

            const categoryLabels = monthlyIncomeData.map(item => item.month);
            const monthlyIncomeTotals = monthlyIncomeData.map(item => parseFloat(item.total_income));


            const monthlyIncome = new Chart(monthlyIncomeChart, {
                type: 'line',
                data: {
                    labels: categoryLabels,
                    datasets: [{
                        label: 'Total Income',
                        data: monthlyIncomeTotals,
                        borderWidth: 3,
                        fill: {
                            target: 'origin',
                            above: 'rgba(75, 192, 192, 0.46)'
                        },
                        borderColor: 'rgb(75, 192, 192)',
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                          },
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: true,
                            },
                          },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            usePointStyle: true,
                            callbacks: {
                                labelPointStyle: function (context) {
                                    return {
                                        pointStyle: 'triangle',
                                        rotation: 0
                                    };
                                },
                                labelColor: function(context) {
                                    return {
                                        borderColor: 'rgb(75, 192, 192)',
                                        backgroundColor: 'rgb(75, 192, 192)',
                                        borderWidth: 2,
                                        borderDash: [2, 2],
                                        borderRadius: 2,
                                    };
                                }
                            }
                        }
                    }
                }
            });
        });

    const monthSelector = document.getElementById('month-selector');

    if (monthSelector) {
        monthSelector.addEventListener('change', renderChart); // Use renderChart function
        renderChart(); // Initial chart render
    }

    function getSelectedMonth() {
        return monthSelector ? monthSelector.value : null;
    }

    // ------- Monthly Expense Chart ------- //
    function renderChart() {
        fetch('/finance_tracker/monthly_expense_json/')
            .then(resp => resp.json())
            .then(monthlyExpenseData => {
                console.log('Fetched monthlyExpenseData (flat):', monthlyExpenseData);

                // Filter data by selected month
                const selectedMonth = getSelectedMonth();
                const filteredData = monthlyExpenseData.filter(item => item.month === selectedMonth);
                console.log('Filtered data:', filteredData);


                // Create Labels
                const uniqueMonthLabels = filteredData.reduce((uniqueMonths, item) => {
                    if (!uniqueMonths.includes(item.month)) {
                        uniqueMonths.push(item.month);
                    }
                    return uniqueMonths;
                }, []);

                const datasets = [];
                const categoryExpenseMap = {}; // To group expenses by category

                // Group expenses by category
                filteredData.forEach(item => {
                    const category = item.category;
                    const month = item.month;
                    const totalExpense = item.total_expense;

                    if (!categoryExpenseMap[category]) {
                        categoryExpenseMap[category] = {}; // Initialize category if not present
                    }
                    // Take the absolute value of expense totals for chart display:
                    categoryExpenseMap[category][month] = Math.abs(totalExpense); // Store expense for month in category map as absolute value
                });

                // Create datasets from categoryExpenseMap
                for (const categoryName in categoryExpenseMap) {
                    const monthlyExpenseMapForCategory = categoryExpenseMap[categoryName];
                    const expenseDataForChart = uniqueMonthLabels.map((monthLabel, monthIndex) => {
                        const monthString = monthLabel;
                        return monthlyExpenseMapForCategory[monthString] || 0; // Get expense for this month or 0 if no data
                    });

                    datasets.push({
                        label: categoryName,
                        data: expenseDataForChart,
                    });
                }

                // Destroy blank  chart to allow for a new cahrt to render with data
                if (myChart) {
                    myChart.destroy();
                }

                myChart = new Chart(expenseByMonthChart, {
                    type: 'bar',
                    data: {
                        labels: uniqueMonthLabels,
                        datasets: datasets
                    },
                    options: {
                        tooltip: {
                            enabled: true,
                        },
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'left'
                            }
                        }
                    }
                });


            });
    }
});