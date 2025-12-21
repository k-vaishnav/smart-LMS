// src/components/CartItem.jsx
import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h5 className="fw-bold">{item.course.title}</h5>
          <p className="text-muted mb-1">
            Instructor: {item.course.instructor?.name || "Unknown"}
          </p>
          <p className="fw-semibold text-success mb-0">₹ {item.course.price}</p>
        </div>

        <button
          className="btn btn-outline-danger mt-2 mt-md-0"
          onClick={() => onRemove(item._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
