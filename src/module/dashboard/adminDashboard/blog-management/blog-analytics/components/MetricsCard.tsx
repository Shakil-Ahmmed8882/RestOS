import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import Chart from "react-apexcharts";

const chartOptions = {
  chart: {
    id: "basic-line",
    toolbar: { show: false },
    sparkline: { enabled: true },
    zoom: { enabled: true },
  },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#00D019"],
};

const generateSeriesData = () => [
  [1609459200000, 120],
  [1609545600000, 140],
  // Add more data as needed
];

export default function MetricsCard({ metric }) {
  return (
    <Card
      className={`transition-transform transform hover:scale-105 ${metric.color} hover:shadow-lg`}
    >
      <CardBody>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">{metric.title}</p>
        </div>
        <p className="text-2xl font-bold">{metric.value}</p>
        <div className="overflow-hidden">
          <Chart
            options={chartOptions as any}
            series={[{ data: generateSeriesData() }]}
            type="line"
            height={60}
          />
        </div>
      </CardBody>
    </Card>
  );
}
