import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "/src/styles/analytics.css";

Chart.register(...registerables);

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/reservas/estadisticas")
      .then(response => setStats(response.data))
      .catch(error => console.error("Error al obtener estadísticas", error));
  }, []);

  if (!stats) {
    return <div>Cargando estadísticas...</div>;
  }

  // Transformar datos del backend en un formato adecuado
  const formatChartData = (dataObj, label) => {
    const labels = Object.keys(dataObj);
    const data = Object.values(dataObj);
    return {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      }],
    };
  };

  const histogramData = formatChartData(stats.histogramaReservas, "Reservas por Día");
  const labReservationsData = formatChartData(stats.reservasPorLaboratorio, "Reservas por Laboratorio");
  const priorityAvgData = formatChartData({ "Prioridad": stats.promedioPrioridad }, "Promedio de Prioridad");
  const labDemandData = {
    labels: stats.laboratoriosMasDemandados.map(lab => lab.nombre),
    datasets: [{
      label: "Demanda de Laboratorios",
      data: stats.laboratoriosMasDemandados.map(lab => lab.cantidad),
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)"
      ],
      borderWidth: 1,
    }],
  };
  
  return (
    <div className="analytics-container">
      <h1>Analíticas de Reservas</h1>
      <div className="chart-container">
        <h2>Histograma de Reservas</h2>
        <Bar data={histogramData} />
      </div>
      <div className="chart-container">
        <h2>Reservas por Laboratorio</h2>
        <Bar data={labReservationsData} />
      </div>
      <div className="chart-container">
        <h2>Promedio de Reservas por Prioridad</h2>
        <Bar data={priorityAvgData} />
      </div>
      <div className="chart-container">
        <h2>Demanda de Laboratorios</h2>
        <Pie data={labDemandData} />
      </div>
    </div>
  );
};

export default Analytics;
