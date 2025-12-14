export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("access_token");
};

export const getUserRole = (): "user" | "creator" | null => {
  const role = localStorage.getItem("user_role");
  if (role === "user" || role === "creator") {
    return role;
  }
  return null;
};

export const setUserRole = (role: "user" | "creator") => {
  localStorage.setItem("user_role", role);
};

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
};
