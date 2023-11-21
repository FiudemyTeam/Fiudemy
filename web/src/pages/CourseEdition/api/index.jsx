import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;


export const updateCourseInformation = async (courseId, courseData) => {
   console.log("COURSE DATA", courseData);
   try {
      await axios.patch(
         `${API_HOST}/courses/${courseId}`,
         {
            name: courseData.title,
            description: courseData.description,
            image: courseData.image,
            course_materials: courseData.modules,
         },
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );

      console.log('Course edited successfully:', response.data);    
    //          const { id: generatedCourseId } = courseResponse.data;
            
        const modulePromises = courseData.modules.map((module, index) => {
            return axios.post(
                `${API_HOST}/courses/${courseId}/material`,
                {
                    title: module.moduleTitle,
                    description: module.moduleDescription,
                    order: index+1,
                    type: module.moduleContentType,
                    value: module.moduleContent
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
                );
            });
            
            const materialResponses = await Promise.all(modulePromises);

            materialResponses.forEach((response, index) => {
               console.log(`Material added to course for module ${index + 1}:`, response.data);
            });
            
            setSuccessMessage(true); // Activa el mensaje de éxito
    //          setCreatedCourseId(generatedCourseId);
            } catch (error) {
            console.error('Error editing course or adding material:', error);
            }
    };
