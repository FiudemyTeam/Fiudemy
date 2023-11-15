import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";

const ProfesorProfile = () => {
  // Ejemplo de datos del profesor
  const profesorData = {
    name: "Nombre del Profesor",
    courses: [
      {
        id: 1,
        name: "Curso 1",
        description: "Descripción del Curso 1",
        image: "URL de la imagen del Curso 1",
        students: 25,
      },
      // Otros cursos del profesor
    ],
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil del Profesor: {profesorData.name}
        </Typography>

        {/* Botón para crear nuevos cursos */}
        <Link to="/crear-curso" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
            Crear Nuevo Curso
          </Button>
        </Link>

        {/* Lista de cursos del profesor */}
        <Grid container spacing={2}>
          {profesorData.courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={course.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.name}
                  </Typography>
                  <Typography>{course.description}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/course/${course.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small">Ver</Button>
                  </Link>
                </CardActions>
                <div style={{ padding: "16px" }}>
                  <Typography>Alumnos: {course.students}</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfesorProfile;