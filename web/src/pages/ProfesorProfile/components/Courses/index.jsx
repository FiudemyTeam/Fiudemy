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
} from "@mui/material";

const CurrentCourses = ({ courses, showProgress = false, title = "" }) => {
  if (courses.length === 0) {
    return <> </>;
  }

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
