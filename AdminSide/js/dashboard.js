const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // months
    datasets: [{
        label: 'Sales (in $)',
        data: [500, 700, 800, 650, 900, 1000, 1100, 1200, 950, 850, 1200, 1300], // sales figures for each month
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,  // Set to true to create the filled area chart
        tension: 0.4, // Smoothness of the line
        pointRadius: 5,
        pointHoverRadius: 7
    }]
};

// Chart configuration
const config = {
    type: 'line', // Line chart type
    data: salesData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales (in $)'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `$${tooltipItem.raw}`;
                    }
                }
            }
        }
    }
};

// Create the chart
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, config);