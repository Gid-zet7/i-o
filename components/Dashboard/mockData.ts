import { months } from "@/helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Performance",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const doughnutChartData = {
  labels: ["Pink", "Blue", "Yellow"],
  datasets: [
    {
      label: "Performance Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 100, 247)",
        "rgb(58, 61, 231)",
        "rgb(233, 236, 59)",
      ],
      hoverOffset: 4,
    },
  ],
};
