import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;


export const updateCourseInformation = async (courseId, courseData) => {
   console.log("Información para actualizar", courseData);
   try {
      await axios.patch(
         `${API_HOST}/courses/${courseId}`,
            courseData,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );

      console.log('Course edited successfully:', response.data);    
                        
      setSuccessMessage(true); // Activa el mensaje de éxito
   } catch (error) {
      console.error('Error editing course or adding material:', error);
   }
    };
