import { Box, Container, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CoursesFilters from "./components/Filters";
import CoursesGrid from "./components/Grid";
import Copyright from "@components/Copyright";

export default function Landpage() {
  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 0,
            pb: 4,
          }}
        >
        <Container sx={{ py: 2 }} maxWidth="md">
          <CoursesFilters />
        </Container>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <AutoStoriesIcon
                fontSize={"inherit"}
                vertical-align={"middle"}
                sx={{ mr: 2 }}
              />
              Fiudemy
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Elige entre más de 210.000 cursos de vídeo en línea con nuevo
              contenido cada mes
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <CoursesGrid />
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
}
