import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPlace } from "../api/places";
import { getReviews, createReview } from "../api/reviews";
import { useAuthStore } from "../store/authStore";

export default function PlaceDetails() {
  const { id } = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadPlaceDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const placeResponse = await getPlace(id);
        const reviewsResponse = await getReviews(id);

        setPlace(placeResponse.place);
        setReviews(reviewsResponse.reviews || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadPlaceDetails();
  }, [id]);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    setReviewError("");
    setSuccess("");

    if (!accessToken) {
      setReviewError("You need to log in first.");
      return;
    }

    try {
      await createReview(
        id,
        {
          rating: Number(rating),
          comment: comment.trim(),
        },
        accessToken
      );

      const placeResponse = await getPlace(id);
      const reviewsResponse = await getReviews(id);

      setPlace(placeResponse.place);
      setReviews(reviewsResponse.reviews || []);

      setRating("5");
      setComment("");
      setSuccess("Review added!");
    } catch (err) {
      setReviewError(err.message || "Could not post review");
    }
  };

  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorText>{error}</ErrorText>
      </Wrapper>
    );
  }

  if (!place) {
    return <Wrapper>Place not found.</Wrapper>;
  }

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
          <li>Changing table: {place.features?.changingTable ? "Yes" : "No"}</li>
          <li>Private room: {place.features?.privateRoom ? "Yes" : "No"}</li>
          <li>Stroller access: {place.features?.strollerAccess ? "Yes" : "No"}</li>
          <li>Accessible: {place.features?.accessible ? "Yes" : "No"}</li>
          <li>Cleanliness: {place.features?.clean ? "Yes" : "No"}</li>
        </ul>
      </Section>

      <Section>
        <h2>Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id}>
              <strong>⭐ {review.rating}</strong>
              {review.comment && <p>{review.comment}</p>}
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
          <Form onSubmit={handleSubmitReview}>
            <label>
              Rating
              <select value={rating} onChange={(event) => setRating(event.target.value)}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </label>

            <label>
              Comment
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
                placeholder="Write your review here"
              />
            </label>

            {reviewError && <ErrorText>{reviewError}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}

            <button type="submit">Post review</button>
          </Form>
        )}
      </Section>
    </Wrapper>
  );
}

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
  max-width: 500px;

  label {
    display: grid;
    gap: 6px;
  }

  select,
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: inherit;
  }

  button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
  }
`;

const ErrorText = styled.p`
  color: red;
`;

const SuccessText = styled.p`
  color: green;
`;