const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlaces() {
  const res = await fetch(`${API_BASE_URL}/places`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch places");
  }

  return data;
}

export async function getPlace(id) {
  const res = await fetch(`${API_BASE_URL}/places/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch place");
  }

  return data;
}

export async function createPlace(place) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/places`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(place),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create place");
  }

  return data;
}