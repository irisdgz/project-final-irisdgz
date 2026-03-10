import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPlaces } from "../api/places";
import PlaceCard from "../components/PlaceCard";
import MapTest from "../components/MapTest";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");

    getPlaces()
      .then((data) => setPlaces(data.places || []))
      .catch((err) => setError(err.message || "Failed to load places"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <Hero>
        <h1>Find baby changing facilities near you</h1>
        <p className="muted">
          Discover clean, accessible and family-friendly places.
        </p>
      </Hero>

      <MapTest />

      <Section>
        {loading && <p>Loading places…</p>}
        {error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && places.length === 0 && (
          <p>No places added yet.</p>
        )}

        <Grid>
          {places.map((p) => (
            <PlaceCard key={p._id} place={p} />
          ))}
        </Grid>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding: 24px 16px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  margin-bottom: 24px;

  .muted {
    color: #666;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 16px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const ErrorText = styled.p`
  color: red;
  margin: 0;
`;