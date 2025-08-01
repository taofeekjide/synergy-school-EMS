import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyUser() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.data.success === false) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }
    verifyUser();
  }, []);

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
