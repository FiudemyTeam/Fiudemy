import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Copyright from "@components/Copyright";
import UserInformation from "./components/UserInformation";
import Courses from "./components/Courses";
import { getSubscribedCourses, fetchFavCourses } from "./api";

const UserProfile = () => {
  const [startedCourses, setStartedCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([]);

  useEffect(() => {
    getSubscribedCourses()
      .then((courses) => {
        courses = courses.map((course) => {
          const progress = 50;
          return { ...course, progress };
        });
        setStartedCourses(courses);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos!", error);
      });
    fetchFavCourses()
      .then((courses) => {
        setFavCourses(courses);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos!", error);
      });
  }, []);

  return (
    <div>
      <main>
        <Container maxWidth="md" sx={{ marginTop: "20px" }}>
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
