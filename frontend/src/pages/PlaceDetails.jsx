import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPlace } from "../api/places";
import { getReviews, createReview } from "../api/reviews";
import { useAuthStore } from "../store/authStore";

export default function PlaceDetails() {
  const { id } = useParams();
  const accessToken = useAuthStore((s) => s.accessToken);

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // review form
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const placeData = await getPlace(id); // { success, place }
      const reviewData = await getReviews(id); // { success, reviews }

      setPlace(placeData.place);
      setReviews(reviewData.reviews || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmitReview = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!accessToken) {
      setFormError("You need to be logged in to leave a review.");
      return;
    }

    const ratingNum = Number(rating);

    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      setFormError("Rating must be between 1 and 5.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview(id, { rating: ratingNum, comment }, accessToken);

      setComment("");
      setRating("5");

      // refresh reviews + place rating/count
      await fetchData();
    } catch (err) {
      setFormError(err.message || "Could not post review.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <RatingText>
        ⭐ {place.avgRating ?? 0} ({place.reviewCount ?? 0} reviews)
      </RatingText>

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
              {r.comment ? <p>{r.comment}</p> : <p>No comment</p>}
            </ReviewCard>
          ))
        )}
      </Section>

      <Section>
        <h2>Leave a review</h2>

        {!accessToken ? (
          <p>
            Please <Link to="/login">log in</Link> to leave a review.
          </p>
        ) : (
          <Form onSubmit={onSubmitReview}>
            <label>
              Rating
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="5">5 - Great</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - OK</option>
                <option value="2">2 - Not great</option>
                <option value="1">1 - Bad</option>
              </select>
            </label>

            <label>
              Comment (optional)
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Write a short comment…"
              />
            </label>

            {formError && <ErrorText role="alert">{formError}</ErrorText>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post review"}
            </button>
          </Form>
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

const RatingText = styled.p`
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

const Form = styled.form`
  display: grid;
  gap: 12px;
  max-width: 520px;

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  select,
  textarea {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-family: inherit;
    font-size: 14px;
  }

  button {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin: 0;
`;