document.addEventListener("DOMContentLoaded", function() {
    const field1Ctx = document.getElementById('field1Chart').getContext('2d');
    const field2Ctx = document.getElementById('field2Chart').getContext('2d');
    const field3Ctx = document.getElementById('field3Chart').getContext('2d');
    const datePicker = document.getElementById('datePicker');

    let field1Chart, field2Chart, field3Chart; // Variáveis para armazenar os objetos de gráfico

    // Função para buscar os dados das temperaturas com base na data selecionada
    function fetchTemperatureData(date) {
        return fetch(`get_temperature_data.php?date=${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                updateCharts(data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }

    function updateCharts(data) {
        if (field1Chart) {
            field1Chart.destroy();
        }
        if (field2Chart) {
            field2Chart.destroy();
        }
        if (field3Chart) {
            field3Chart.destroy();
        }

        const labels = data.map(record => record.date);
        const avgField1Data = data.map(record => parseFloat(record.avg_field1));
        const minField1Data = data.map(record => parseFloat(record.min_field1));
        const maxField1Data = data.map(record => parseFloat(record.max_field1));
        const avgField2Data = data.map(record => parseFloat(record.avg_field2));
        const minField2Data = data.map(record => parseFloat(record.min_field2));
        const maxField2Data = data.map(record => parseFloat(record.max_field2));
        const avgField3Data = data.map(record => parseFloat(record.avg_field3));
        const minField3Data = data.map(record => parseFloat(record.min_field3));
        const maxField3Data = data.map(record => parseFloat(record.max_field3));

        field1Chart = new Chart(field1Ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Field 1 Average',
                        data: avgField1Data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Field 1 Min',
                        data: minField1Data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        hidden: true
                    },
                    {
                        label: 'Field 1 Max',
                        data: maxField1Data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        hidden: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        field2Chart = new Chart(field2Ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Field 2 Average',
                        data: avgField2Data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Field 2 Min',
                        data: minField2Data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        hidden: true
                    },
                    {
                        label: 'Field 2 Max',
                        data: maxField2Data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        hidden: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        field3Chart = new Chart(field3Ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Field 3 Average',
                        data: avgField3Data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Field 3 Min',
                        data: minField3Data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        hidden: true
                    },
                    {
                        label: 'Field 3 Max',
                        data: maxField3Data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        hidden: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Evento para atualizar os gráficos quando a data do calendário mudar
    datePicker.addEventListener('change', function() {
        const date = datePicker.value; // Pegar a data selecionada
        fetchTemperatureData(date); // Buscar os dados de temperatura para a data selecionada
    });
});
