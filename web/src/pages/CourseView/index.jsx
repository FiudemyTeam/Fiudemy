import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Button } from "@mui/material";
import YouTube from "react-youtube";
import {
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActions,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Paper,
} from "@mui/material";
import { subscribe } from "./api";




export default function CourseView({ data }) {
  const [subscribed, setSubscribed] = useState(data?.is_subscribed);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [youtubeVideoLink, setYoutubeVideoLink] = useState(
    "https://www.youtube.com/watch?v=nKPbfIU442g"
  );

  const handleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscription = async () => {
    try {
      await subscribe({ course_id: data.id });
      setSubscribed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {data?.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {data?.description}
            </Typography>
            <img
              src={data?.image}
              alt={data?.name}
              style={{
                width: "70%",
                height: "50%",
                display: "block",
                margin: "auto",
              }}
            />

            <Paper
              elevation={0}
              style={{
                width: "85%",
                display: "block",
                margin: "auto",
                padding: "20px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Instructor
                </Typography>
                <Typography variant="subtitle2">Enrique Martinez</Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Duración
                </Typography>
                <Typography variant="subtitle2" textAlign="center">
                  30min.
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Nivel
                </Typography>
                <Typography variant="subtitle2" textAlign="center">
                  Básico
                </Typography>
              </div>
            </Paper>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {data?.is_subscribed || subscribed ? (
                <Button variant="contained" disabled>
                  Inscripto
                </Button>
              ) : (
                <Button onClick={handleSubscription} variant="contained">
                  Inscribirse al curso
                </Button>
              )}
              <Button variant="contained">Inscribirse a la certificación</Button>
              <Link to="/donation" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  Hacer una donacion
                </Button>
              </Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {data?.course_materials.map((course) => (
            <Accordion key={course.id} expanded={expandedCourse === course.id}>
              <AccordionSummary
                onClick={() => handleCourseExpansion(course.id)}
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Checkbox
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseSelection(course.id)}
                  sx={{ marginLeft: "auto" }}
                />
              </AccordionSummary>
              <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography>{course.description}</Typography>
                <br />
                {course.type === "video" && course.value && (
                  <YouTube videoId={course.value.split("v=")[1]} />
                )}

              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </main>
    </>
  );
}
