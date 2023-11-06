import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Copyright from "@components/Copyright";
import LinearProgress from "@mui/material/LinearProgress";

import UserInformation from "./components/UserInformation";
import CurrentCourses from "./components/CurrentCourses";
import FinishedCourses from "./components/FinishedCourses";

const UserProfile = () => {
  const coursesStarted = [
    {
      id: 1,
      name: "Curso de Desarrollo Web",
      progress: 30,
      description:
        "Aprende a crear aplicaciones web modernas con las últimas tecnologías.",
      image: "https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg",
    },
    {
      id: 2,
      name: "Diseño Gráfico Avanzado",
      progress: 50,
      description:
        "Perfecciona tus habilidades de diseño gráfico y crea proyectos impresionantes.",
      image:
        "https://institutonoa.com.ar/wp-content/uploads/2021/10/diseno_grafico.jpg",
    },
  ];

  const coursesFinished = [
    {
      id: 3,
      name: "Machine Learning con Python",
      description:
        "Explora el mundo del machine learning y la inteligencia artificial con Python.",
      image:
        "https://escuelafullstack.com/web/image/slide.channel/14/image_512",
    },
    {
      id: 4,
      name: "Curso de Marketing Digital",
      description:
        "Domina las estrategias de marketing digital para hacer crecer tu negocio.",
      image: "https://i.ytimg.com/vi/sRAlwvGz-vo/maxresdefault.jpg",
    },
  ];

  return (
    <div>
      <main>
        <Container sx={{ marginTop: "20px" }}>
          <UserInformation />
          <CurrentCourses courses={coursesStarted} />
          <FinishedCourses courses={coursesFinished} />
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </div>
  );
};

export default UserProfile;
