import React from "react";

import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

const CurrentCourses = ({ courses }) => {
  return (
    <Card style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Cursos empezados
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
                </CardActions>
                <div style={{ padding: "16px" }}>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ mb: 1 }}
                  />
                  <Typography>Progreso: {course.progress}%</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentCourses;
