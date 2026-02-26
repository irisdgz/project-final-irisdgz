import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PlaceCard({ place }) {
  const {
    _id,
    name,
    city,
    category,
    avgRating,
    reviewCount,
    features = {},
  } = place;

  return (
    <Card>
      <Top>
        <Title>
          <StyledLink to={`/places/${_id}`}>{name}</StyledLink>
        </Title>

        {category && <Pill>{category}</Pill>}
      </Top>

      <City>{city}</City>

      <Rating>
        ⭐ {avgRating ?? 0}
        <span>({reviewCount ?? 0})</span>
      </Rating>

      <Features>
        {features.changingTable && <Feature>Changing table</Feature>}
        {features.privateRoom && <Feature>Private room</Feature>}
        {features.strollerAccess && <Feature>Stroller access</Feature>}
        {features.accessible && <Feature>Accessible</Feature>}
      </Features>
    </Card>
  );
}

/* styled components  */

const Card = styled.article`
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  transition: transform 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #cfcfcf;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #111;

  &:hover {
    text-decoration: underline;
  }
`;

const Pill = styled.span`
  border: 1px solid #e7e7e7;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const City = styled.p`
  margin: 0;
  color: #555;
`;

const Rating = styled.div`
  font-size: 14px;
  font-weight: 600;

  span {
    font-weight: 400;
    color: #777;
    margin-left: 4px;
  }
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Feature = styled.span`
  background: #f6f6f6;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
`;