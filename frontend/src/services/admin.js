const API_URL = "http://localhost:5000";

export async function adminLogin(username, password) {
  const response = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Admin login failed");
  return data;
}
