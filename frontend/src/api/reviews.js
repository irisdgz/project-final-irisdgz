const BASE = import.meta.env.VITE_API_URL || "http://localhost:8081";

export async function getReviews(placeId) {
  const res = await fetch(`${BASE}/places/${placeId}/reviews`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function createReview(placeId, review) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/places/${placeId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}