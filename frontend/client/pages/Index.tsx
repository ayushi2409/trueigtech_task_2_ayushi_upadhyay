import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "@/lib/auth";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null;
}
