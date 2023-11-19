import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "@components/Copyright";
import UserInformation from "./components/UserInformation";
import Courses from "./components/Courses";
import { getSubscribedCourses, fetchFavCourses, getProgress } from "./api";

const UserProfile = () => {
  const [startedCourses, setStartedCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getSubscribedCourses();
        const coursesWithProgress = await Promise.all(courses.map(async (course) => {
          const progress = await getProgress(course.id);
          return { ...course, progress };
        }));
        setStartedCourses(coursesWithProgress);
      } catch (error) {
        console.error("Error al obtener los cursos!", error);
      }

      try {
        const courses = await fetchFavCourses();
        setFavCourses(courses);
      } catch (error) {
        console.error("Error al obtener los cursos!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main>
        <Container maxWidth="md" sx={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            Perfil del Usuario
          </Typography>
          <UserInformation />
          <Courses
            courses={startedCourses}
            showProgress={true}
            title="Cursos Empezados"
          />
          <Courses courses={favCourses} title="Cursos Favoritos" />
        </Container>
      </main>
      <Box
        sx={{ bgcolor: "background.paper", marginTop: "40px" }}
        component="footer"
      >
        <Copyright />
      </Box>
    </div>
  );
};

export default UserProfile;
