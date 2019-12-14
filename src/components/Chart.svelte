<script>
  import Chart from 'chart.js'; 
  import { afterUpdate } from 'svelte';
  
  export let obj;
  
let ctx;
let myChart;

async function createChart(){
    const {label, create, paid} = await obj;
    
    ctx = document.getElementById('myChart');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: label,
        datasets: [{
            label: 'Create',
            backgroundColor: 'rgba(255, 59, 13, 0.2)',
            data: create
        },
        {
            label: 'Paid',
            backgroundColor: 'rgba(204, 178, 255, 0.5)',
            data: paid
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

afterUpdate(createChart)

</script>

<canvas id="myChart" width="5" height="1"></canvas>
