import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function getCreatedCourses() {
    try {
      const response = await axios.get(`${API_HOST}/courses/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.filter((course) => course.is_owner);
    } catch (error) {
      throw new Error("Req error: ", error);
    }
  }