import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const initialReviews = [
  {
    id: 1,
    rating: 4,
    comment: "Un curso muy completo y bien explicado.",
  },
  {
    id: 2,
    rating: 5,
    comment: "Excelente curso. Lo recomiendo a todos.",
  },
  {
    id: 3,
    rating: 3,
    comment: "Buen curso, pero podría mejorar en algunos aspectos.",
  },
];

const ReviewView = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(initialReviews);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = () => {
    if (rating > 0 && comment.trim() !== '') {
      const newReview = {
        id: reviews.length + 1, // Simulación de nuevo ID
        rating,
        comment,
      };
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment('');
    }
  };

  return (
    <div>
      <Container sx={{ marginTop: "20px" }}>
      <Typography variant="h4">Opiniones de curso</Typography>
    <div><br></br>
      <Rating name="rating" value={rating} onChange={handleRatingChange} />
      <TextField
        label="Comentario"
        value={comment}
        onChange={handleCommentChange}
        multiline
        rows={4}
        fullWidth
      />
  <br></br><br></br>
  <Button variant="contained" onClick={handleSubmitReview}>
    Enviar Reseña
  </Button>
</div>
<br></br>
<br></br>
<div>

{reviews.map((review) => (
        <div key={review.id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", margin: "10px" }}>
          <Typography variant="h6">Puntuación: {review.rating}</Typography>
          <Typography variant="body1">{review.comment}</Typography>
        </div>
))}
</div>
      </Container>
    </div>
  );
};

export default ReviewView;
