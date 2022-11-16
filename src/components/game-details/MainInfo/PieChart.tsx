import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { selectData } from "../../../features/data/dataSlice";
import { useAppSelector } from "../../../app/hooks";
ChartJS.register(ArcElement, Legend, Tooltip);

const colors = [
  "rgba(15, 186, 61, 0.6)",
  "rgba(52, 227, 227, 0.6)",
  "rgba(211, 222, 53, 0.6)",
  "rgba(130, 33, 204, 0.6)",
];

const options = {
  plugins: {
    legend: {
      labels: {
        color: "#eee",
        boxWidth: 20,
        boxHeight: 5,
      },
    },
  },
};

const PieChart = () => {
  const [data, setData] = useState({
    labels: ["exceptional", "recommended", "meh", "skip"],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  });

  const { singleGameDetails } = useAppSelector(selectData);
  useEffect(() => {
    if (singleGameDetails.ratings) {
      let items = { ...data };
      let item = singleGameDetails.ratings;
      const ratings: number[] = [];
      item.map((rating: { count: number }) => ratings.push(rating.count));
      items.datasets[0].data = ratings;
      setData(items);
    }
  }, [singleGameDetails.ratings]);

  if (data.datasets[0].data.length > 0) {
    return (
      <div className="main-info__chart">
        <Pie options={options} data={data} />
      </div>
    );
  } else return <></>;
};

export default PieChart;
