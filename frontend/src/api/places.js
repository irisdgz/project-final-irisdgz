const BASE = import.meta.env.VITE_API_URL || "http://localhost:8081";

export async function getPlaces() {
  const res = await fetch(`${BASE}/places`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function getPlace(id) {
  const res = await fetch(`${BASE}/places/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function createPlace(place) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/places`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(place),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}