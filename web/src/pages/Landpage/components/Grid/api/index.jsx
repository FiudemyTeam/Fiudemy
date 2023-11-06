import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function fetchCourses(params) {
  try {
    console.log(params);
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
