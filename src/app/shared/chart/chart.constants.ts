export const barChartOptions = {
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: (val) => {
            if (Number.isInteger(val)) {
              return val;
            }
          }
        }
      }
    ]
  }
};
