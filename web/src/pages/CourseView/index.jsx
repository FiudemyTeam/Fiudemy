import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Button } from "@mui/material";
import YouTube from "react-youtube";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { subscribe, unsubscribe, viewCourse, unviewCourse } from "./api";
import { CourseContext } from "@context/CourseContext";

export default function CourseView({ data, handler }) {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  const { isCompleted, setIsCompleted } = useContext(CourseContext);

  const handleCourseExpansion = (course) => {
    if (data?.is_subscribed || data?.is_owner) {
      if (expandedCourse === course.id) {
        setExpandedCourse(null);
      } else {
        setExpandedCourse(course.id);
      }
    }
  };

  const handleCourseSelection = (courseId, materialId, viewed) => {
    if (!viewed) {
      handleView(courseId, materialId);
    } else {
      handleUnview(courseId, materialId);
    }
  };

  const handleUnview = (courseId, materialId) => {
    unviewCourse({ course_id: courseId, material_id: materialId })
      .then(() => {
        handler((e) => (e += 1));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleView = (courseId, materialId) => {
    viewCourse({ course_id: courseId, material_id: materialId })
      .then(() => {
        handler((e) => (e += 1));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubscription = async () => {
    try {
      await subscribe({ course_id: data.id });
      handler((e) => (e += 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsubscription = async () => {
    try {
      await unsubscribe({ course_id: data.id });
      handler((e) => (e += 1));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const totalCoursesCompleted = data?.course_materials.filter(
      (course) => course.viewed
    ).length;
    const totalCourses = data?.course_materials.length;
    const percentage = (totalCoursesCompleted / totalCourses) * 100;
    setCompletedPercentage(percentage);
    setIsCompleted(data?.is_subscribed && percentage === 100);
  }, [data]);

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 0,
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
                <Typography variant="subtitle2">
                  {data?.teacher_name}
                </Typography>
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
              {data?.is_subscribed ? (
                <div>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Completado
                  </Typography>
                  <Typography variant="subtitle2" textAlign="center">
                    {completedPercentage.toFixed(0)}%
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Inscriptos
                  </Typography>
                  <Typography variant="subtitle2" textAlign="center">
                    {data?.total_subscriptions}
                  </Typography>
                </div>
              )}
            </Paper>

            {!data?.is_owner && (
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  onClick={
                    data?.is_subscribed
                      ? handleUnsubscription
                      : handleSubscription
                  }
                  variant="contained"
                  sx={{
                    backgroundColor: data?.is_subscribed
                      ? "#ff0000"
                      : undefined,
                    color: data?.is_subscribed ? "#ffffff" : undefined,
                    "&:hover": {
                      backgroundColor: data?.is_subscribed
                        ? "#cc0000"
                        : undefined,
                    },
                  }}
                >
                  {data?.is_subscribed
                    ? "Desuscribirse del curso"
                    : "Inscribirse al curso"}
                </Button>
                {isCompleted && (
                  <Link
                    to={`/certificate/${data.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Obtener certificado</Button>
                  </Link>
                )}
                <Link to="/donation" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Hacer una donacion</Button>
                </Link>
              </Stack>
            )}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Material
          </Typography>
          {data?.course_materials.map((course) => (
            <Accordion key={course.id} expanded={expandedCourse === course.id}>
              <AccordionSummary onClick={() => handleCourseExpansion(course)}>
                <Typography
                  gutterBottom
                  component="h3"
                  variant="h6"
                  sx={{
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  {course.title}
                </Typography>
                {data?.is_subscribed && (
                  <Checkbox
                    checked={course.viewed}
                    onChange={() =>
                      handleCourseSelection(
                        course.course_id,
                        course.id,
                        course.viewed
                      )
                    }
                    sx={{ marginLeft: "auto" }}
                  />
                )}
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
