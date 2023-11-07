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

export async function fetchFavouriteCourses() {
  try {
    const response = await axios.get(`${API_HOST}/courses/list/favs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {}
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de los cursos!", error);
    return [];
  }
}

export async function favoriteCourse(courseId) {
  const data = {
    course_id: courseId
  }
  try {
    let response = await axios.post(`${API_HOST}/courses/${courseId}/fav`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de los cursos!", error);
    return [];
  }
}
