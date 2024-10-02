import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ series, categories, xAxisLabel, yAxisLabel }) => {
  // console.log(series);

  //get the min and max value of the series
  let min = 500000;
  let max = 0;
  series.forEach(serie => {
    serie.data.forEach(value => {
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    });
  })

  const options = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },

    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: categories,
      title: {
        text: xAxisLabel
      }
    },
    yaxis: {
      title: {
        text: yAxisLabel
      },
      min: min,
      max: max
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export { LineChart };
