import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;


export const updateCourseInformation = async (courseId, courseData) => {
   console.log("Información para actualizar", courseData);
   try {
      await axios.put(
         `${API_HOST}/courses/${courseId}`,
         courseData,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );

      return { success: true };
   } catch (error) {
      console.error('Error editing course or adding material:', error);
      return { success: false };
   }
};
