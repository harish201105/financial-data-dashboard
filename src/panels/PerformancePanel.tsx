import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
} from "@progress/kendo-react-charts";

import { getPerformance } from "../services/dataService";
import Loading from "../layout/Loading";

export default function PerformancePanel() {
  const [data, setData] = React.useState<string[]>();
  React.useEffect(() => {
    getPerformance().then((results: string[]) => {
      setData(results);
    })
  }, []);

  return (
    <>
      {!data && <Loading />}
      <Chart style={{ opacity: data ? "1" : "0" }}>
        <ChartTitle text="Fund Performance" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={["2018", "2019", "2020", "2021", "2022", "2023", "2024"]} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type="line" data={data} />
        </ChartSeries>
      </Chart>
    </>
  )
}
