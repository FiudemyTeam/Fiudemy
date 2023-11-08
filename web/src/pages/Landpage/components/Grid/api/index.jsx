import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function fetchCourses(params) {
  try {
    const response = await axios.get(`${API_HOST}/courses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de los cursos!", error);
    return [];
  }
}

export async function favoriteCourseToggle(course) {
  try {
    const params = {
      method: course.is_favorite ? "DELETE" : "POST",
      url: `${API_HOST}/courses/${course.id}/favorite`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    let response = await axios(params)
    return response.data.is_favorite;
  } catch (error) {
    console.error("Error favoriteCourseToggle", error);
    return course.is_favorite;
  }
}
