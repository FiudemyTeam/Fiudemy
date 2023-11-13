import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseView from "../CourseView";
import ReviewView from "../CourseFeedback";
import { getCourseData } from "./api";
import Copyright from "@components/Copyright";
import { Box } from "@mui/material";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseData({ id }).then((data) => {
      setCourseData(data);
    });
  }, []);

  return (
    <>
      <CourseView data={courseData} />
      <ReviewView />
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
};

export default CourseDetail;
