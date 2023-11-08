import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import CourseView from "../CourseView";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simula la carga de detalles del curso desde una fuente de datos
    // Reemplaza esto con tu lógica de obtención de datos
    const fakeCourseData = {
      name: "Curso de Programación",
      description:
        "Aprende programación avanzada con ejemplos prácticos y proyectos emocionantes.",
      instructor: "John Doe",
      duration: "10 semanas",
      level: "Avanzado",
    };

    // Simulamos una solicitud de carga de datos
    setTimeout(() => {
      setCourse(fakeCourseData);
    }, 1000);
  }, [id]);

  return (
    <div>
      <Container sx={{ marginTop: "20px" }}>
        {course ? (
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>
              {course.name}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
              Instructor: {course.instructor}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
              Duración: {course.duration}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
              Nivel: {course.level}
            </Typography>
            <Typography variant="body1">{course.description}</Typography>
            {/* Agrega más detalles del curso aquí, como el contenido, el precio, las reseñas, etc. */}
          </Paper>
        ) : (
          <Typography>Cargando detalles del curso...</Typography>
        )}
      </Container>
      <br></br>
      <br></br>
      <CourseView/>
    </div>
  );
};

export default CourseDetail;

