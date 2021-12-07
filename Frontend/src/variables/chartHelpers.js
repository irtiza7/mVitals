const getoxyLvlChart = function (influxData) {
  //console.log(influxData);
  var labels = [];
  var oxyData = [];

  influxData.forEach(d => {
    if (d.oxylvl !== "@") {
      labels.push(d.time.toLocaleTimeString());
      oxyData.push(d.oxylvl.replace('%', ''));
    }
  });

  const dashboardOxygenChart = {
    data: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            borderColor: "#AF3AF7",
            backgroundColor: "#AF3AF7",
            pointRadius: 0,
            fill: false,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: oxyData,
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };

  return dashboardOxygenChart;

}


const getPulseChart = function (influxData) {
  //console.log(influxData);
  var labels = [];
  var pulseDataVals = [];

  influxData.forEach(d => {
    if (d.pulse !== "@") {
      labels.push(d.time.toLocaleTimeString());
      pulseDataVals.push(d.pulse);
    }
  });


  // const labels = influxData.map(d => d.time.toLocaleTimeString());
  // const pulseDataVals = influxData.map(d => d.pulse);

  const dashboardPulseChart = {
    data: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            borderColor: "#45F73A",
            backgroundColor: "#45F73A",
            pointRadius: 0,
            fill: false,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: pulseDataVals,
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };
  return dashboardPulseChart;
}

const getBpChart = function (influxData) {
  console.log(influxData);
  const labels = influxData.map(d => d.time.toLocaleTimeString());
  const lwrbpData = influxData.map(d => d.lwrbp);
  const uprbpData = influxData.map(d => d.uprbp);

  const dashboardBPChart = {
    data: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: lwrbpData,
          },
          {
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: uprbpData,
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };
  return dashboardBPChart;

}

const getECGChart = function (influxData) {
  //console.log(influxData);
  const labels = influxData.map(d => d.time.toLocaleTimeString());
  const ecgData = influxData.map(d => d.ecg);

  const dashboardECGChart = {
    data: {
      labels: labels,
      datasets: [
        {
          data: ecgData,
          fill: false,
          borderColor: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0.5,
          lineTension: 0,
          pointRadius: 0
        },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "top",
        events: ['click']
      },
    },
  };

  return dashboardECGChart;
}


const getTempChart = function (influxData) {
  //console.log(influxData);

  const labels = influxData.map(d => d.time.toLocaleTimeString());
  const dataVals = influxData.map(d => d.temp);

  const dashboardTempChart = {
    data: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            borderColor: "#3A96F7",
            backgroundColor: "#3A96F7",
            pointRadius: 0,
            fill: false,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: dataVals,
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };

  return dashboardTempChart;
}

export { getTempChart, getPulseChart, getoxyLvlChart, getBpChart, getECGChart };