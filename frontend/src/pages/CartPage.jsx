// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { fetchCartItems, removeCartItem } from "../services/cartApi";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await fetchCartItems(user.token);
      setCartItems(data);
    } catch (err) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    await removeCartItem(id, user.token);
    loadCart();
  };

  useEffect(() => {
    if (user?.token) loadCart();
  }, [user]);

  const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.course.price, 0)
    : 0;

  if (loading) return <h3 className="text-center mt-5">Loading cart...</h3>;

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-cart3 fs-4 text-primary me-2"></i>
        <h4 className="fw-semibold mb-0">My Cart</h4>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center p-5 bg-light rounded shadow-sm">
          <h4>Your cart is empty</h4>
          <Link to="/courses" className="btn btn-primary mt-3">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} onRemove={handleRemove} />
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">Order Summary</h5>
                <hr />

                <div className="mb-2 text-muted">
                  {cartItems.length} course{cartItems.length > 1 ? "s" : ""}
                </div>

                <p className="d-flex justify-content-between mb-0">
                  <span>Total</span>
                  <strong>₹ {totalAmount}</strong>
                </p>

                <button
                  className="btn btn-success w-100 mt-3"
                  disabled={cartItems.length === 0}
                  onClick={()=>navigate('/checkout',{state:{courses:cartItems.map(item=>item.course), totalAmount}})}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
