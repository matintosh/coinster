import React, { useContext, useEffect, useState } from "react";
import { CoinsterContext } from "../../context";
import { getCurrentUser } from "../../utils/auth";
import Chart from "react-apexcharts";
import { currencyUsageService } from "../../services/currencyService";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props?.chart?.data,
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "string",
          categories: this.props?.chart?.days.map( d => moment(d).format('DD/MM/yy')),
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

const daysAreInTheSameDay = (d1, d2) => {
  return moment(d1).isSame(moment(d2), 'day')
};

const DashboardHome = () => {
  const { transferences } = useContext(CoinsterContext);
  const [usage, setUsage] = useState(null);
  const user = getCurrentUser();
  const { first_name } = user;

  const formatData = (data) => {

    let daysAgo = [];
    for (var i = 1; i <= 7; i++) {
      daysAgo.push(moment().subtract(i, "days").toDate());
    }

    const chartData = [];

    for (let currency of data) {
      const transferencesNumbers = daysAgo.map(
        (d) =>
          currency.transferences.filter((t) =>
            daysAreInTheSameDay(d, new Date(t.created_at))
          ).length
      ).reverse()
      const currencyData = {
        name: currency.name,
        data: transferencesNumbers,
      };

      chartData.push(currencyData);
    }

    const chart = {
      data: chartData,
      days: daysAgo.reverse()
    };

    return chart;
  };

  const getData = async () => {
    const response = await currencyUsageService();

    if (!response) return;

    setUsage(formatData(response.data.currency_usage));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard-home">
      <div className="dashboard-welcome">
        <p className="dashboard-title">Hello {first_name},</p>
        <p className="dashboard-transferences-counter">
          How's your day going?
          <br /> you have <span>{transferences?.length ?? ""}</span>{" "}
          transferences.
        </p>
      </div>

      <div className="featured-dashboards">
        {usage ? <ApexChart chart={usage} /> : <CircularProgress color="primary" />}
      </div>
    </div>
  );
};

export default DashboardHome;
