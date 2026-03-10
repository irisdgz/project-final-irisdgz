import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export default function AddPlace() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("other");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!accessToken) {
      setError("You need to log in first.");
      return;
    }

    const latNumber = Number(lat);
    const lngNumber = Number(lng);

    if (!name.trim() || !city.trim()) {
      setError("Please fill in name and city.");
      return;
    }

    if (isNaN(latNumber) || isNaN(lngNumber)) {
      setError("Please enter valid numbers for latitude and longitude.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          category,
          lat: latNumber,
          lng: lngNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not add place.");
        return;
      }

      navigate("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Wrapper>
      <h1>Add a new place</h1>

      <Form onSubmit={handleSubmit}>
        <label>
          Name *
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          City *
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
              type="text"
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              placeholder="59.334"
            />
          </label>

          <label>
            Lng *
            <input
              type="text"
              value={lng}
              onChange={(event) => setLng(event.target.value)}
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