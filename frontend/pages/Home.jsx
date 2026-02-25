import { useEffect, useState } from "react";
import { api } from "../api";
import PlaceCard from "../components/PlaceCard";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/places")
      .then((data) => setPlaces(data.places || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {places.map((p) => (
        <PlaceCard key={p._id} place={p} />
      ))}
    </div>
  );
}