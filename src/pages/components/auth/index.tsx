import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (values: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const API_BASE_URL = "http://localhost:3000";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    name: string | null;
    id: string;
  }>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, name: null, id: "" };
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(authState));
  }, [authState]);

  const login = async (values: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("🦆 ~ login ~ data:", data);
      setAuthState({ isAuthenticated: true, name: data.name, id: data.id });
      return true;
    }
    return false;
  };
  const logout = () => {
    setAuthState({ isAuthenticated: false, name: null, id: "" });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
