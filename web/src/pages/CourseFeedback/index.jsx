import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Container, Box } from "@mui/material";
import axios from "axios";
import { CourseContext } from "@context/CourseContext";

const API_HOST = import.meta.env.VITE_API_HOST;

const ReviewView = () => {
  const { id } = useParams();
  const { isCompleted } = useContext(CourseContext);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_HOST}/courses/${id}/rate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        console.error("Error al obtener reseñas del backend");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async () => {
    if (rating > 0 && comment.trim() !== "") {
      const newReview = {
        rate: rating,
        comment: comment,
      };

      try {
        const response = await axios.post(
          `${API_HOST}/courses/${id}/rate`,
          newReview,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // La reseña fue creada con éxito en el backend
          await fetchReviews();
          setRating(0);
          setComment("");
        } else {
          // Manejar otros casos, si es necesario
          console.error("Error al crear la reseña en el backend");
        }
      } catch (error) {
        console.error("Error de red", error);
      }
    }
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: "0px" }}>
        <Typography variant="h4" paddingY={2}>
          Opiniones de curso
        </Typography>
        {isCompleted && (
          <div>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
            />
            <TextField
              label="Comentario"
              value={comment}
              onChange={handleCommentChange}
              multiline
              rows={4}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleSubmitReview}
              sx={{ marginY: "15px" }}
            >
              Enviar Reseña
            </Button>
          </div>
        )}
        <div>
          {reviews.map((review) => (
            <div
              key={review.course_id + "-" + review.user_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Typography variant="h6" display="flex" alignItems="center">
                Puntuación:
                <Box ml={1} display="flex" alignItems="flex-end">
                  <Rating name="rating" value={review.rate} readOnly />
                </Box>
              </Typography>
              <Typography variant="body1">{review.comment}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ReviewView;
