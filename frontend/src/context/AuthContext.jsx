import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const backenedURL = "http://localhost:3002";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  // register user
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(backenedURL + "/api/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // save user to local storage
      return { success: true, message: "Registration successful" };
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      return { success: false, message: msg };
    }
  };
  // login user
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(backenedURL + "/api/auth/login", {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // save user to local storage
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.log("Login error:", error);
      const msg = error.response?.data?.message || "Login failed";
      return { success: false, message: msg };
    }
  };

  // logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove user from local storage
  };

  return (
    <AuthContext.Provider
      value={{ register, login, logout, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
