import { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SearchContext } from "@context/SearchContext";
import { fetchCourses } from "./api";

const CoursesGrid = () => {
  const { searchString, category, rate, favorite } = useContext(SearchContext);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fc() {
      const data = await fetchCourses({
        searchString: searchString ?? undefined,
        category: category ?? undefined,
        rate: rate ?? undefined,
        favorite: favorite ?? undefined,
      });
      setCourses(data);
    }
    fc();
  }, [searchString, category, rate, favorite]);

  return (
    <Grid container spacing={4}>
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesGrid;
