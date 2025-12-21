import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";

const BACKENED_URL = import.meta.env.VITE_BACKEND_URL;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[message]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (currentPassword == "") {
      setMessage("Invalid Credentials");
      return;
    }
    if (newPassword != confirmPassword) {
      setMessage("❌ New and confirm passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        BACKENED_URL + `/api/changepassword/change-password`,
        {
          oldPassword: currentPassword,
          newPassword,
        },
        config
      );
      setMessage(data.message);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }

    if (success) {
      setTimeout(() => setSuccess(false), 3000); // Auto hide alert
    }
  };

  useEffect(() => {});
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">Change Password</h3>

        {/* Message */}
        {message && (
          <div className="mt-3 text-center fw-semibold text-secondary">
            <Alert variant={success ? "success" : "danger"}>{message}</Alert>
          </div>
        )}
        <form onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label fw-semibold">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="form-control"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label fw-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Password match text */}
          {confirmPassword && (
            <div
              className={`form-text ${
                newPassword === confirmPassword ? "text-success" : "text-danger"
              }`}
            >
              {newPassword === confirmPassword
                ? "✅ Passwords match"
                : "❌ Passwords do not match"}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
