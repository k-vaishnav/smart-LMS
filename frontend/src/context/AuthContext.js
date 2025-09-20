import { createContext } from "react";
import axios from "axios";
const AuthContext = createContext();
const backenedURL = "http://localhost:3002";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // login user
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(backenedURL + "/api/auth/login", {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // save user to local storage
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  // logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove user from local storage
  };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
