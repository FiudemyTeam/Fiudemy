import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

const ReviewView = () => {

  

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async () => {
    if (rating > 0 && comment.trim() !== '') {
      const newReview = {
        rate: rating,
        comment: comment,
      };

      try {
        const response = await axios.post(`${API_HOST}/courses/2/rate`, 
        newReview, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 201) {
          // La reseña fue creada con éxito en el backend
          const createdReview = response.data;
          setReviews([...reviews, createdReview]);
          setRating(0);
          setComment('');
        } else {
          // Manejar otros casos, si es necesario
          console.error('Error al crear la reseña en el backend');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    }
  }

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
          <Typography variant="h6">Puntuación: {review.rate}</Typography>
          <Typography variant="body1">{review.comment}</Typography>
        </div>
))}
</div>
      </Container>
    </div>
  );
};

export default ReviewView;
