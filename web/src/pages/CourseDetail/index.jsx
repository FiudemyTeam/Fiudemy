import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseView from "../CourseView";
import ReviewView from "../CourseFeedback";
import { getCourseData } from "./api";

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
    </>
  );
};

export default CourseDetail;
