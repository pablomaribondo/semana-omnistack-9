import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

import api from "../../services/api";
import "./styles.css";

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const userId = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio(process.env.REACT_APP_BASE_URL, {
        query: { user_id: userId },
      }),
    [userId]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/dashboard", {
        headers: { user_id: userId },
      });

      setSpots(response.data);
    })();
  }, [userId]);

  const acceptHandler = async id => {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(prevState => prevState.filter(request => request._id !== id));
  };

  const rejectHandler = async id => {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(prevState => prevState.filter(request => request._id !== id));
  };

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data:{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => acceptHandler(request._id)}
            >
              ACEITAR
            </button>
            <button
              className="reject"
              onClick={() => rejectHandler(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
};

export default Dashboard;
