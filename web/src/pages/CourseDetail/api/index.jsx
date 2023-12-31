import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function getCourseData({ id }) {
  try {
    const response = await axios.get(`${API_HOST}/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}
