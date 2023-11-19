import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function getSubscribedCourses() {
  try {
    const response = await axios.get(`${API_HOST}/courses/subscribed/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}

export async function fetchFavCourses() {
  try {
    const response = await axios.get(`${API_HOST}/courses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        favorite: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de los cursos!", error);
    return [];
  }
}

export async function getProgress(course_id) {
  try {
    const response = await axios.get(`${API_HOST}/progress/${course_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.progress;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}