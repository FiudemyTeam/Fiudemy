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
import { getCreatedCourses } from "./api"


const ProfesorProfile = () => {
  
  const [createdCourses, setCreatedCourses] = useState([]);

  const ownedCourses = createdCourses.filter((course) => course.is_owner);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCreatedCourses();
        setCreatedCourses(courses);
      } catch (error) {
        console.error("Error al obtener los cursos!", error);
      }
    };

    fetchData();
  }, []);

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
          <Courses
            courses={ownedCourses}
            title="Cursos creados"
          />
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
