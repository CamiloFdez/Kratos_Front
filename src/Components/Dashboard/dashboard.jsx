// src/components/Dashboard/Dashboard.jsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleEventAdd = (info) => {
    console.log("Evento agregado:", info.event);
  };

  const events = [
    { title: "Reserva 1", start: "2025-03-15T10:00:00", end: "2025-03-15T12:00:00" },
    { title: "Reserva 2", start: "2025-03-21" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Panel de Reservas</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="es"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventAdd={handleEventAdd}
        height="600px"
      />
      <div className="button-container">
        <button
          className="dashboard-button"
          onClick={() => alert("Abrir formulario de reserva")}
        >
          Haz tu reserva
        </button>
        <button
          className="dashboard-button"
          onClick={() => alert("Mostrar información de contacto")}
        >
          Contáctanos
        </button>
        <button
          className="dashboard-button"
          onClick={() => alert("Mostrar laboratorios")}
        >
          Laboratorios
        </button>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
