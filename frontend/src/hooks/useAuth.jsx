import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  return { isAuthenticated: !!user, loading, user };
};
