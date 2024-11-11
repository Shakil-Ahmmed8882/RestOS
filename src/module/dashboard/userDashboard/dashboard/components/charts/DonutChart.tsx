import React from "react";
import Chart from "react-apexcharts";

interface DonutChartProps {
  percentage: number;
  labels?: string[]; 
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage = 50,
  labels = ["Profile Completed", "Profile Remaining"],
}) => {
  const options = {
    series: [percentage, 100 - percentage],
    chart: {
      type: "donut" as const,
    },
    colors: ["#00D019", "#e0e0e0"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "60%",
          labels: {
            show: true,
            total: {
              show: true,
              label: `${percentage}%`,
              fontSize: "24px",
              color: "#00D019",
            },
          },
        },
      },
    },
    legend: {
      show: true,
      position: "right" as "right", // Explicitly cast to "right" string
      labels: {
        useSeriesColors: true, // Use the colors of the series in the legend
        formatter: (seriesName: string, opts: any) => {
          // Dynamically set the legend name based on seriesIndex
          return labels[opts.seriesIndex]; // This will show "Profile Completed" for the first series and "Profile Remaining" for the second series
        },
      },
    },
    tooltip: {
      enabled: true, // Enable tooltip
      y: {
        formatter: (val: number) => {
          return `${val}%`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom" as "bottom", // Explicitly cast to "bottom" string for responsive
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="300"
      />
    </div>
  );
};

export default DonutChart;
