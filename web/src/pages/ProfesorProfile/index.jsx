// Importa las dependencias necesarias
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Copyright from "@components/Copyright";
import UserInformation from "../UserProfile/components/UserInformation";
import Courses from "../UserProfile/components/Courses";
import { getSubscribedCourses, fetchFavCourses } from "../UserProfile/api";
import CourseCreation from "../CourseCreation";

// Define el componente UserProfile
const ProfesorProfile = () => {
  // Estado para almacenar cursos iniciados y favoritos
  const [startedCourses, setStartedCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([]);

  // Efecto para cargar datos cuando el componente se monta
  useEffect(() => {
    // Obtiene cursos iniciados
    getSubscribedCourses()
      .then((courses) => {
        // Modifica los cursos para agregar progreso (50% en este caso)
        courses = courses.map((course) => {
          const progress = 50;
          return { ...course, progress };
        });
        setStartedCourses(courses);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });

    // Obtiene cursos favoritos
    fetchFavCourses()
      .then((courses) => {
        setFavCourses(courses);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos favoritos:", error);
      });
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  // Renderiza el componente
  return (
    <div>
      <main>
        <Container maxWidth="md" sx={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            Perfil del Profesor
          </Typography>
          <UserInformation />
          <br></br><br></br>
          <Link to="/course-creation" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
              Crear Nuevo Curso
            </Button>
          </Link>
        </Container>
        <Container maxWidth="md" sx={{ marginTop: "20px"}}>
          <Courses courses={startedCourses} showProgress={true} title="Cursos Empezados" />

          {/* Muestra los cursos favoritos */}
          <Courses courses={favCourses} title="Cursos Creados" />
        </Container>
      </main>

      {/* Componente de pie de página */}
      <Box
        sx={{ bgcolor: "background.paper", marginTop: "40px" }}
        component="footer"
      >
        <Copyright />
      </Box>
    </div>
  );
};

// Exporta el componente UserProfile
export default ProfesorProfile;
