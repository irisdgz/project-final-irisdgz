const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export async function getReviews(placeId) {
  const res = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Could not fetch reviews");
  return data;
}

export async function createReview(placeId, { rating, comment }, accessToken) {
  const res = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ rating, comment }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Could not create review");
  return data;
}