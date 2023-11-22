import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  LinearProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getCreatedCourses, deleteCourse } from "../../api"; 


const CurrentCourses = ({ courses, showProgress = false, title = "", handleDeleteCourseInProfile }) => {


  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId)
      .then(() => {
        handleDeleteCourseInProfile(courseId);
      })
      .catch((error) => {
        console.error("Error al eliminar el curso:", error);
      });
  };

  return (
    <Card style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {courses.map((course) => (
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
                  <Link
                    to={`/edit-course/${course.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton color="error" onClick={() => handleDeleteCourse(course.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
                {showProgress && (
                  <div style={{ padding: "16px" }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ mb: 1 }}
                    />
                    <Typography>Progreso: {course.progress}%</Typography>
                  </div>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentCourses;