
const API_URL = "http://localhost:5000/api";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export const getEmployees = () => apiRequest("/employees");

export const getLeaves = () => apiRequest("/leaves");

export const getDashboard = () => apiRequest("/dashboard");

export const getAvailability = () => apiRequest("/availability");
