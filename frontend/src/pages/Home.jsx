import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPlaces } from "../api/places";
import PlaceCard from "../components/PlaceCard";
import PlacesMap from "../components/PlacesMap";

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
        <Title>Time for a MiniStop?</Title>
        <Subtitle>
          Find a clean changing spot, quick and easy.
        </Subtitle>
      </Hero>

      <MapWrapper>
        <PlacesMap places={places} />
      </MapWrapper>

      <Section>
        {loading && <StatusText>Loading places...</StatusText>}
        {error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && places.length === 0 && (
          <StatusText>No places added yet.</StatusText>
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 40px 56px;

  @media (max-width: 768px) {
    padding: 32px 20px 48px;
  }

  @media (max-width: 480px) {
    padding: 24px 14px 40px;
  }
`;

const Hero = styled.section`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: #111;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 18px;
  color: #666;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const MapWrapper = styled.div`
  margin-bottom: 32px;
  border-radius: 16px;
  overflow: hidden;
`;

const Section = styled.section`
  display: grid;
  gap: 16px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatusText = styled.p`
  margin: 0;
  color: #444;
`;

const ErrorText = styled.p`
  margin: 0;
  color: red;
`;