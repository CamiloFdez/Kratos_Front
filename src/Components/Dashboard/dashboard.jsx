import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
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
      laboratorio: newEvent.laboratorio,
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

  const handleUpdateReserva = (fechaHora, updatedReserva) => {
    axios.put(`http://localhost:8080/reservas/${fechaHora}`, updatedReserva)
      .then(() => {
        axios.get("http://localhost:8080/reservas") 
          .then(response => {
            const formattedEvents = response.data.map(reserva => ({
              id: reserva.id,
              title: reserva.proposito,
              start: new Date(reserva.fechaHora),
              end: new Date(new Date(reserva.fechaHora).getTime() + 60 * 60 * 1000),
            }));
            setEvents(formattedEvents); 
          })
          .catch(error => console.error("Error al obtener las reservas", error));
  
        setShowModifyForm(false);
      })
      .catch(error => {
        console.error("Error al actualizar la reserva", error);
        alert("Error al actualizar la reserva.");
      });
  };

  const handleDeleteReserva = (fechaHora) => {
    axios.delete(`http://localhost:8080/reservas/${fechaHora}`)
      .then(() => {
        axios.get("http://localhost:8080/reservas") 
          .then(response => {
            const formattedEvents = response.data.map(reserva => ({
              id: reserva.id,
              title: reserva.proposito,
              start: new Date(reserva.fechaHora),
              end: new Date(new Date(reserva.fechaHora).getTime() + 60 * 60 * 1000),
            }));
            setEvents(formattedEvents); 
          })
          .catch(error => console.error("Error al obtener las reservas", error));
  
        setShowDeleteForm(false);
      })
      .catch(error => {
        console.error("Error al eliminar la reserva", error);
        alert("Error al eliminar la reserva.");
      });
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Reservas</h1>
      <div className="dashboard-content">
        <div className="button-container">
          <button className="dashboard-button" onClick={() => setShowModifyForm(true)}>
            Modifica una reserva
          </button>
          <button className="dashboard-button" onClick={() => setShowDeleteForm(true)}>
            Elimina una reserva
          </button>
          <button className="dashboard-button" onClick={() => setShowForm(true)}>
            Haz tu reserva
          </button>
          <button className="dashboard-button" onClick={() => setShowContact(true)}>
            Contáctanos
          </button>
          <button className="dashboard-button" onClick={() => setShowLabs(true)}>
            Laboratorios
          </button>
          <button className="dashboard-button" onClick={() => navigate("/analytics")}>
            Ver Analíticas
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
      {showModifyForm && <ModifyReservationForm onClose={() => setShowModifyForm(false)} onUpdateReserva={handleUpdateReserva} />}
      {showDeleteForm && <DeleteReservationForm onClose={() => setShowDeleteForm(false)} onDeleteReserva={handleDeleteReserva} />}  
      {showContact && <ContactInfo onClose={() => setShowContact(false)} />}
      {showLabs && <LabsInfo onClose={() => setShowLabs(false)} />}
    </div>
  );
};

const ReservationForm = ({ onClose, onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState(1);
  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/laboratorios/")
      .then(response => setLaboratorios(response.data))
      .catch(error => console.error("Error al obtener laboratorios:", error));
  }, []);

  const handleSubmit = () => {
    if (title && dateTime && priority >= 1 && priority <= 5 && laboratorioSeleccionado) {
      const newEvent = {
        title,
        start: dateTime,
        prioridad: parseInt(priority, 10),
        laboratorio: laboratorios.find(lab => lab.id === laboratorioSeleccionado)
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
      <input type="dateTime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      <input type="number" min="1" max="5" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Prioridad (1-5)" />
      <select value={laboratorioSeleccionado} onChange={(e) => setLaboratorioSeleccionado(e.target.value)} required>
        <option value="">Seleccione un laboratorio</option>
        {laboratorios.map(lab => (
          <option key={lab.id} value={lab.id}>{lab.nombre} - {lab.ubicacion}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Agregar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

const ModifyReservationForm = ({ onClose, onUpdateReserva, initialReserva }) => {
  const [fechaHoraActual, setFechaHoraActual] = useState(
    initialReserva ? initialReserva.fechaHora.substring(0, 16) : ""
  );
  const [newdateTime, setNewDateTime] = useState("");
  const [newTitle, setNewTitle] = useState(initialReserva ? initialReserva.proposito : "");
  const [newPriority, setNewPriority] = useState(initialReserva ? initialReserva.prioridad : 1);
  const [laboratorios, setLaboratorios] = useState([]);
  const [newLaboratorioSeleccionado, setNewLaboratorioSeleccionado] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/laboratorios/")
      .then(response => setLaboratorios(response.data))
      .catch(error => console.error("Error al obtener laboratorios:", error));
  }, []);

  const handleUpdate = () => {
    if (fechaHoraActual && newdateTime && newTitle && newPriority >= 1 && newPriority <= 5 && newLaboratorioSeleccionado) {
      const fullNewFechaHora = newdateTime;
      const updatedReserva = {
        proposito: newTitle,
        fechaHora: fullNewFechaHora,
        prioridad: parseInt(newPriority, 10),
        laboratorio: laboratorios.find(lab => lab.id === newLaboratorioSeleccionado)
      };
      onUpdateReserva(fechaHoraActual, updatedReserva);
    } else {
      alert("Completa todos los campos y asegúrate de que la prioridad esté entre 1 y 5.");
    }
  };

  return (
    <div className="modal">
      <h3>Modificar Reserva</h3>
      <label>Fecha y hora actual de la reserva:</label>
      <input
        type="datetime-local"
        value={fechaHoraActual}
        onChange={(e) => setFechaHoraActual(e.target.value)}
      />
      <label>Nueva fecha y hora:</label>
      <input
        type="dateTime-local"
        value={newdateTime}
        onChange={(e) => setNewDateTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nuevo propósito"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
        placeholder="Nueva prioridad (1-5)"
      />
      <label>Nuevo Laboratorio:</label>
      <select value={newLaboratorioSeleccionado} onChange={(e) => setNewLaboratorioSeleccionado(e.target.value)} required>
        <option value="">Seleccione un laboratorio</option>
        {laboratorios.map(lab => (
          <option key={lab.id} value={lab.id}>{lab.nombre} - {lab.ubicacion}</option>
        ))}
      </select>
      <button onClick={handleUpdate}>Actualizar Reserva</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

const DeleteReservationForm = ({ onClose, onDeleteReserva }) => {
  const [fechaHora, setFechaHora] = useState(""); 

  const handleDelete = () => {
    if (fechaHora) {
      onDeleteReserva(`${fechaHora}:00`);
    } else {
      alert("Ingresa la fecha y hora de la reserva a eliminar.");
    }
  };

  return (
    <div className="modal">
      <h3>Eliminar Reserva</h3>
      <input
        type="datetime-local"
        placeholder="Fecha y hora de la reserva a eliminar"
        value={fechaHora}
        onChange={(e) => setFechaHora(e.target.value)}
      />
      <button onClick={handleDelete}>Eliminar Reserva</button>
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



