import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function subscribe({ course_id }) {
  try {
    const response = await axios.post(
      `${API_HOST}/courses/${course_id}/subscribe`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}

export async function unsubscribe({ course_id }) {
  try {
    const response = await axios.delete(
      `${API_HOST}/courses/${course_id}/unsubscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}