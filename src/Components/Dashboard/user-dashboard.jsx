import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLabs, setShowLabs] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/reservas")
      .then(response => {
        const formattedEvents = response.data.map(reserva => ({
          id: reserva.id,
          title: reserva.proposito,
          start: reserva.fechaHora,
          end: new Date(new Date(reserva.fechaHora).getTime() + 60 * 60 * 1000),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error("Error al obtener las reservas", error));
  }, []);

  const handleEventAdd = (newEvent) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const usuarioId = storedUser ? storedUser.id : null;

    if (!usuarioId) {
      alert("No se encontró un usuario autenticado. Inicia sesión nuevamente.");
      return;
    }

    const reservaData = {
      id: crypto.randomUUID(),
      usuarioId: usuarioId,
      laboratorio: { id: "1", nombre: "Laboratorio 1", ubicacion: "Edificio A", capacidad: 30 },
      fechaHora: `${newEvent.start}:00`,
      proposito: newEvent.title,
      prioridad: newEvent.prioridad
    };

    axios.post("http://localhost:8080/reservas", reservaData)
      .then(response => {
        const formattedEvent = {
          id: response.data.id,
          title: response.data.proposito,
          start: new Date(response.data.fechaHora),
          end: new Date(new Date(response.data.fechaHora).getTime() + 60 * 60 * 1000),
        };
        setEvents([...events, formattedEvent]);
        setShowForm(false);
      })
      .catch(error => {
        console.error("Error al agregar la reserva", error);
        alert("Error al agregar la reserva. Asegúrate de que la prioridad esté entre 1 y 5.");
      });
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
          <button className="logout-button" onClick={() => navigate("/register")}>Cerrar sesión</button>
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
  const [priority, setPriority] = useState(1);

  const handleSubmit = () => {
    if (title && date && start && priority >= 1 && priority <= 5) {
      const newEvent = {
        title,
        start: `${date}T${start}`,
        prioridad: parseInt(priority, 10),
      };
      onAddEvent(newEvent);
    } else {
      alert("Por favor, completa todos los campos y asegúrate de que la prioridad esté entre 1 y 5.");
    }
  };

  return (
    <div className="modal">
      <h3>Nueva Reserva</h3>
      <input type="text" placeholder="Propósito de la reserva" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="number" min="1" max="5" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Prioridad (1-5)" />
      <button onClick={handleSubmit}>Agregar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

const ContactInfo = ({ onClose }) => (
  <div className="modal">
    <h3>Información de Contacto</h3>
    <p>Email: <a href="mailto:soporte@empresa.com">soporte@empresa.com</a></p>
    <p>Teléfono: 123-456-7890</p>
    <button onClick={onClose}>Cerrar</button>
  </div>
);

const LabsInfo = ({ onClose }) => (
  <div className="modal">
    <h3>Laboratorios Disponibles</h3>
    <ul>
      <li>Laboratorio A</li>
      <li>Laboratorio B</li>
      <li>Laboratorio C</li>
    </ul>
    <button onClick={onClose}>Cerrar</button>
  </div>
);

export default UserDashboard;

