import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// @mui
import { Card, CardHeader, Box } from "@mui/material";
// components
import { BaseOptionChart } from "../chart";

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: {
  [x: string]: any;
  title: any;
  subheader: any;
  chartLabels: any;
  chartData: any;
}) {
  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: chartData.map((i: any) => i.fill) },
    labels: chartLabels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: any) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
