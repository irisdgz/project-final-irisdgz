import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPlaces } from "../api/places";
import PlaceCard from "../components/PlaceCard";
import PlacesMap from "../components/PlacesMap";
import Filters from "../components/Filters";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    onlyChangingTable: false,
  });

  useEffect(() => {
    setLoading(true);
    setError("");
    getPlaces()
      .then((data) => setPlaces(data.places || []))
      .catch((err) => setError(err.message || "Failed to load places"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = places.filter((p) => {
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.onlyChangingTable && !p.features?.changingTable) return false;
    return true;
  });

  return (
    <Wrapper>
      <Hero>
        <Title>Time for a MiniStop?</Title>
        <Subtitle>Find a clean changing spot, quick and easy.</Subtitle>
      </Hero>
      <MapWrapper>
        <PlacesMap places={filtered} />
      </MapWrapper>
      <ContentGrid>
        <Sidebar>
          <Filters value={filters} onChange={setFilters} />
        </Sidebar>
        <Section>
          {loading && <StatusText>Loading places...</StatusText>}
          {error && <ErrorText>{error}</ErrorText>}
          {!loading && !error && filtered.length === 0 && (
            <StatusText>No places match your filters.</StatusText>
          )}
          <Grid>
            {filtered.map((p) => (
              <PlaceCard key={p._id} place={p} />
            ))}
          </Grid>
        </Section>
      </ContentGrid>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 40px 56px;
  @media (max-width: 768px) { padding: 32px 20px 48px; }
  @media (max-width: 480px) { padding: 24px 14px 40px; }
`;
const Hero = styled.section`margin-bottom: 32px;`;
const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 600;
`;
const Subtitle = styled.p`
  margin: 0;
  font-size: 18px;
  color: #666;
`;
const MapWrapper = styled.div`
  margin-bottom: 32px;
  border-radius: 16px;
  overflow: hidden;
`;
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const Sidebar = styled.aside``;
const Section = styled.section`display: grid; gap: 16px;`;
const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;
const StatusText = styled.p`margin: 0; color: #444;`;
const ErrorText = styled.p`margin: 0; color: red;`;