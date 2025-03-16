import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    { title: "Reserva 1", start: "2025-03-15T10:00:00", end: "2025-03-15T12:00:00" },
    { title: "Reserva 2", start: "2025-03-21" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLabs, setShowLabs] = useState(false);

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Reservas</h1>
      <div className="dashboard-content">
        <div className="button-container">
          <button className="dashboard-button" onClick={() => setShowForm(true)}>
            Haz tu reserva
          </button>
          <button className="dashboard-button" onClick={() => setShowContact(true)}>
            Contáctanos
          </button>
          <button className="dashboard-button" onClick={() => setShowLabs(true)}>
            Laboratorios
          </button>
          <button className="logout-button" onClick={() => navigate("/register")}>
            Cerrar sesión
          </button>
        </div>
        <div className="calendar-wrapper">
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
            height="600px"
          />
        </div>
      </div>
      {showForm && <ReservationForm onClose={() => setShowForm(false)} onAddEvent={handleEventAdd} />}
      {showContact && <ContactInfo onClose={() => setShowContact(false)} />}
      {showLabs && <LabsInfo onClose={() => setShowLabs(false)} />}
    </div>
  );
};

const ReservationForm = ({ onClose, onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = () => {
    if (title && date && start && end) {
      onAddEvent({ title, start: `${date}T${start}`, end: `${date}T${end}` });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="modal">
      <h3>Nueva Reserva</h3>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button onClick={handleSubmit}>Agregar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

const ContactInfo = ({ onClose }) => (
  <div className="modal">
    <h3>Información de Contacto</h3>
    <p>
      Email: <a href="mailto:camilo.fernandez@mail.escuelaing.edu.co">camilo.fernandez@mail.escuelaing.edu.co</a>
    </p>
    <p>Teléfono: 3186345689</p>
    <button onClick={onClose}>Cerrar</button>
  </div>
);

const LabsInfo = ({ onClose }) => (
  <div className="modal">
    <h3>Laboratorios Disponibles</h3>
    <ul>
      <li>Aula de Estrategias Digitales</li>
      <li>Aula Interactiva</li>
      <li>Ingeniería de Software</li>
    </ul>
    <button onClick={onClose}>Cerrar</button>
  </div>
);

export default Dashboard;

