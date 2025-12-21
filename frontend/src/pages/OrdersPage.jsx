import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "react-bootstrap/Spinner";

const BACKENED_URL = import.meta.env.VITE_BACKEND_URL;
export const OrdersPage = () => {
  let [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BACKENED_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  if (loading) {
    return (
      <div className="text-center mx-auto my-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">My Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow-sm">
            <div className="card-header">
              <small className="text-muted">
                Order ID: {order._id.slice(-6)}
              </small>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  Order Date:{new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="badge bg-success">{order.paymentStatus}</span>
              </div>
              <h6 className="fw-bold">Courses</h6>
              <ul className="list-group list-group-flush mb-3">
                {order.courses.map((course) => (
                  <li
                    key={course._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{course.title}</span>
                    <span className="text-muted">
                      {course.instructor?.name}
                    </span>

                    <Link
                      to={`/learning`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Go to Course
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="fw-semibold">Total Paid: ₹ {order.amount}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
