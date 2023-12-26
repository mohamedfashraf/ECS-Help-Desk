import React, { useState, useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import BarChart from "../../charts/BarChart"; // Import BarChart component
import axios from "axios";

function DashboardCard12() {
  const [keywordChartData, setKeywordChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  const [typeChartData, setTypeChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  // Array of colors for the charts
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#36A2EB",
    // ... add more colors as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          "http://localhost:3000/api/reports/analytics/issues",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Transform keyword data
        const keywordLabels = response.data.keywords.map((item) => item._id);
        const keywordData = response.data.keywords.map((item) => item.count);

        setKeywordChartData({
          labels: keywordLabels,
          datasets: [
            {
              data: keywordData,
              backgroundColor: colors.slice(0, keywordData.length),
            },
          ],
        });

        // Transform type data
        const typeLabels = response.data.types.map((item) => item._id);
        const typeData = response.data.types.map((item) => item.count);

        setTypeChartData({
          labels: typeLabels,
          datasets: [
            {
              data: typeData,
              backgroundColor: colors.slice(0, typeData.length),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = {
    // Customize your chart options here
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-full xl:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Analytics
        </h2>
      </header>
      <div className="flex justify-around p-5">
        <div
          className="chart-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {keywordChartData.labels.length > 0 && (
            <DoughnutChart data={keywordChartData} width={389} height={260} />
          )}
        </div>
        <div
          className="chart-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "500px",
            height: "300px",
          }}
        >
          {typeChartData.labels.length > 0 && (
            <BarChart data={typeChartData} options={barChartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
