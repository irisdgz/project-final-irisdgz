import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPlace } from "../api/places";
import { getReviews } from "../api/reviews";

export default function PlaceDetails() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const placeData = await getPlace(id);      // { success, place }
        const reviewData = await getReviews(id);   // { success, reviews }

        setPlace(placeData.place);
        setReviews(reviewData.reviews || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <Wrapper>Loading…</Wrapper>;
  if (error)
    return (
      <Wrapper>
        <ErrorText>{error}</ErrorText>
      </Wrapper>
    );
  if (!place) return <Wrapper>Place not found.</Wrapper>;

  const features = place.features || {};

  return (
    <Wrapper>
      <BackLink to="/">Back</BackLink>

      <Title>{place.name}</Title>
      <City>{place.city}</City>

      <Rating>
        ⭐ {place.avgRating ?? 0} ({place.reviewCount ?? 0} reviews)
      </Rating>

      <Section>
        <h2>Features</h2>
        <ul>
          <li>Changing table: {features.changingTable ? "Yes" : "No"}</li>
          <li>Private room: {features.privateRoom ? "Yes" : "No"}</li>
          <li>Stroller access: {features.strollerAccess ? "Yes" : "No"}</li>
          <li>Accessible: {features.accessible ? "Yes" : "No"}</li>
        </ul>
      </Section>

      <Section>
        <h2>Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <ReviewCard key={r._id}>
              <strong>⭐ {r.rating}</strong>
              <p>{r.comment}</p>
            </ReviewCard>
          ))
        )}
      </Section>
    </Wrapper>
  );
}

/* styled components */

const Wrapper = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  color: #666;
  text-decoration: none;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const City = styled.p`
  margin: 8px 0;
  color: #666;
`;

const Rating = styled.p`
  margin: 12px 0 24px;
  font-weight: 600;
`;

const Section = styled.section`
  margin-top: 24px;

  h2 {
    margin-bottom: 8px;
  }

  ul {
    padding-left: 20px;
  }
`;

const ReviewCard = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
`;

const ErrorText = styled.p`
  color: red;
`;