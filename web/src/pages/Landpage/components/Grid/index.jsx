import { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SearchContext } from "@context/SearchContext";
import { fetchCourses, fetchFavouriteCourses, favoriteCourse } from "./api";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CoursesGrid = () => {
  const { searchString, category, rate, favorite } = useContext(SearchContext);

  const [courses, setCourses] = useState([]);
  const [favoriteCourses, setFavouriteCourses] = useState([])

  useEffect(() => {
    
    async function fetchData() {
      await fc(); 
      await ffc();
    }

    fetchData()

  }, [searchString, category, rate, favorite]);

  async function fc() {
    const data = await fetchCourses({
      searchString: searchString ?? undefined,
      category: category ?? undefined,
      rate: rate ?? undefined,
      favorite: favorite ?? undefined,
    });
    setCourses(data);
  }

  async function ffc() {
    const data = await fetchFavouriteCourses();
    setFavouriteCourses(data);
  }

  const handleFavoriteClick = async (courseId) => {
    await favoriteCourse(courseId);
    
    if (favoriteCourses.includes(courseId)) {
      // Si el curso ya es favorito, eliminarlo
      setFavouriteCourses(favoriteCourses.filter(id => id !== courseId));
    } else {
      // Si el curso no es favorito, agregarlo
      setFavouriteCourses([...favoriteCourses, courseId]);
    }
  };

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
              <IconButton 
                color={favoriteCourses.includes(course.id) ? "error" : "default"}
                onClick={() => handleFavoriteClick(course.id)}>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesGrid;
