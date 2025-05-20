import { useEffect, useState } from "react";
import "../../style/candidate/Notification.css";
const Notification = () => {
  const userId = localStorage.getItem("user_id");
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/notifications/${userId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={
                notif.message.toLowerCase().includes("accepted")
                  ? "accepted"
                  : "rejected"
              }
            >
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
