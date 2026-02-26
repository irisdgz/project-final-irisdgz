import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import PlaceCard from "../components/PlaceCard";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/places")
      .then((data) => setPlaces(data.places || []))
      .catch((err) => setError(err.message))
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

/*styled components */

const Wrapper = styled.main`
  padding: 40px 16px;
  max-width: 1120px;
  margin: 0 auto;
`;

const Hero = styled.section`
  margin-bottom: 48px;

  h1 {
    margin: 0;
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 12px;
    font-size: 16px;
    color: #666;
  }
`;

const Section = styled.section`
  border-top: 1px solid #e7e7e7;
  padding-top: 32px;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ErrorText = styled.p`
  color: crimson;
`;