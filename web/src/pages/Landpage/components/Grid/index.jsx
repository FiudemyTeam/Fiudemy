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
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SearchContext } from "@context/SearchContext";
import RatingStars from "../RatingStars";
import { fetchCourses, favoriteCourseToggle } from "./api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TeacherIcon from "@mui/icons-material/HistoryEdu";

const CoursesGrid = () => {
  const { searchString, category, rate, favorite } = useContext(SearchContext);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchString, category, rate, favorite]);

  async function fetchData() {
    const data = await fetchCourses({
      searchString: searchString ?? undefined,
      category: category ?? undefined,
      rate: rate ?? undefined,
      favorite: favorite ?? undefined,
    });
    setCourses(data);
  }

  const handleFavoriteClick = async (course) => {
    const is_favorite = await favoriteCourseToggle(course);
    setCourses(
      courses.map((c) => {
        if (c.id === course.id) {
          c.is_favorite = is_favorite;
        }
        return c;
      })
    );
  };

  return (
    <Grid container spacing={4}>
      {courses.map((course) => (
        <Grid item key={course?.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
                position: "relative",
              }}
              image={course?.image}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: "white",
                  borderRadius: "30%",
                  padding: course?.is_owner ? 0.5 : 0,
                  display: "flex",
                  borderColor: "red",
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                {course?.is_owner ? (
                  <TeacherIcon sx={{ color: "black", fontSize: 30 }} />
                ) : (
                  <IconButton
                    onClick={() => handleFavoriteClick(course)}
                    sx={{
                      color: course?.is_favorite ? "red" : "black",
                      "&:hover": {
                        color: "red",
                      },
                      fontSize: 30,
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </Box>
            </CardMedia>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {course?.name}
              </Typography>
              <Typography>{course?.description}</Typography>
            </CardContent>
            <CardActions>
              <Link
                to={`/course/${course?.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small">Ver</Button>
              </Link>
              <RatingStars rate={course?.total_rate ?? 0} fontSize="small" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesGrid;
