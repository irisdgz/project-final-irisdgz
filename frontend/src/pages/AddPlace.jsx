import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export default function AddPlace() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("other");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!accessToken) {
      setError("You must be logged in.");
      return;
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);

    if (!name.trim() || !city.trim()) {
      setError("Name and city are required.");
      return;
    }

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
      setError("Lat and Lng must be valid numbers.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          category,
          lat: latNum,
          lng: lngNum,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Could not create place.");
        return;
      }

      navigate("/");
    } catch {
      setError("Network error. Try again.");
    }
  };

  return (
    <Wrapper>
      <h1>Add a new place</h1>

      <Form onSubmit={handleSubmit}>
        <label>
          Name *
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          City *
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="cafe">Cafe</option>
            <option value="restaurant">Restaurant</option>
            <option value="mall">Mall</option>
            <option value="public">Public</option>
            <option value="other">Other</option>
          </select>
        </label>

        <Row>
          <label>
            Lat *
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="59.334"
            />
          </label>

          <label>
            Lng *
            <input
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="18.063"
            />
          </label>
        </Row>

        {error && <Error>{error}</Error>}

        <button type="submit">Create place</button>
      </Form>
    </Wrapper>
  );
}

/* styled */

const Wrapper = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  input,
  select {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  button {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
`;

const Error = styled.p`
  color: red;
  margin: 0;
`;