import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Copyright from "@components/Copyright";
import UserInformation from "../UserProfile/components/UserInformation";
import Courses from "../UserProfile/components/Courses";
import { getCreatedCourses } from "../ProfesorProfile/api";
import CourseCreation from "../CourseCreation";

// Define el componente UserProfile
const ProfesorProfile = () => {
  // Estado para almacenar cursos iniciados y favoritos
  const [createdCourses, setCreatedCourses] = useState([]);

  // Efecto para cargar datos cuando el componente se monta
  useEffect(() => {
    // Obtiene cursos creados por el usuario actual
    getCreatedCourses()
      .then((courses) => {
        courses = courses.map((course) => {
          const enrollment_count = 50;
          return { ...course, enrollment_count };
        });
        setCreatedCourses(courses);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
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
          <Courses courses={createdCourses}  title="Cursos Creados" />


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

