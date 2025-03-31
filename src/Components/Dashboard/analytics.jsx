import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "/src/styles/analytics.css";

Chart.register(...registerables);

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/reservas/estadisticas")
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener estadísticas", error);
        setError("Error al cargar las estadísticas");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!stats) {
    return <div className="error-message">No se encontraron datos</div>;
  }

  const colors = {
    blue: "rgba(54, 162, 235, 0.7)",
    red: "rgba(255, 99, 132, 0.7)",
    yellow: "rgba(255, 206, 86, 0.7)",
    green: "rgba(75, 192, 192, 0.7)",
    purple: "rgba(153, 102, 255, 0.7)",
    orange: "rgba(255, 159, 64, 0.7)"
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const chartData = {
    histogram: {
      labels: Object.keys(stats.histogramaReservas),
      datasets: [{
        label: "Reservas por Día",
        data: Object.values(stats.histogramaReservas),
        backgroundColor: colors.blue,
        borderColor: colors.blue.replace('0.7', '1'),
        borderWidth: 1,
      }],
    },
    labs: {
      labels: Object.keys(stats.reservasPorLaboratorio),
      datasets: [{
        label: "Reservas por Laboratorio",
        data: Object.values(stats.reservasPorLaboratorio),
        backgroundColor: colors.green,
        borderColor: colors.green.replace('0.7', '1'),
        borderWidth: 1,
      }],
    },
    priority: {
      labels: ["Prioridad"],
      datasets: [{
        label: "Promedio de Prioridad",
        data: [stats.promedioPrioridad],
        backgroundColor: colors.purple,
        borderColor: colors.purple.replace('0.7', '1'),
        borderWidth: 1,
      }],
    },
    demand: {
      labels: stats.laboratoriosMasDemandados.map(lab => lab.nombre),
      datasets: [{
        label: "Demanda de Laboratorios",
        data: stats.laboratoriosMasDemandados.map(lab => lab.cantidad),
        backgroundColor: [
          colors.red,
          colors.blue,
          colors.yellow,
          colors.green,
          colors.purple
        ],
        borderColor: [
          colors.red.replace('0.7', '1'),
          colors.blue.replace('0.7', '1'),
          colors.yellow.replace('0.7', '1'),
          colors.green.replace('0.7', '1'),
          colors.purple.replace('0.7', '1')
        ],
        borderWidth: 1,
      }],
    }
  };

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>Analíticas de Reservas</h1>
        <p className="analytics-subtitle">Estadísticas de uso de laboratorios</p>
      </header>
  
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Reservas por Día</h2>
          <div className="chart-wrapper">
            <Bar 
              data={chartData.histogram} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} 
            />
          </div>
          <div className="card-footer">
            Últimas fechas: {Object.keys(stats.histogramaReservas).join(', ')}
          </div>
        </div>
  
        <div className="dashboard-card">
          <h2>Uso por Laboratorio</h2>
          <div className="chart-wrapper">
            <Bar 
              data={chartData.labs} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
          <div className="card-footer">
            Comparación de uso entre laboratorios
          </div>
        </div>
  
        <div className="dashboard-card">
          <h2>Prioridad Promedio</h2>
          <div className="chart-wrapper">
            <Bar 
              data={chartData.priority} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { max: 5 } }
              }} 
            />
          </div>
          <div className="card-footer">
            Nivel promedio: {stats.promedioPrioridad?.toFixed(1) || 'N/A'}
          </div>
        </div>
  
        <div className="dashboard-card">
          <h2>Top Laboratorios</h2>
          <div className="chart-wrapper">
            <Pie 
              data={chartData.demand} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
          <div className="card-footer">
            Los 5 más demandados
          </div>
        </div>
  
        <div className="dashboard-card full-width">
          <h2>Detalles de Laboratorios</h2>
          <div className="lab-details">
            {stats.laboratoriosMasDemandados.map((lab, index) => (
              <div key={index} className="lab-item">
                <h3>{lab.nombre}</h3>
                <div className="lab-stats">
                  <span className="stat"><strong>Reservas:</strong> {lab.cantidad}</span>
                  <span className="stat"><strong>Prioridad:</strong> {lab.prioridadPromedio?.toFixed(1) || 'N/A'}</span>
                  <span className="stat"><strong>Horas:</strong> {(lab.horasTotales || 0).toFixed(1)} hrs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;