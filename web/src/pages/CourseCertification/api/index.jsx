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

export async function fetchUserInformation() {
  try {
    const response = await axios.get(`${API_HOST}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Req error: ", error);
  }
}

export async function fetchQrCode({ id }) {
  try {
    const response = await axios.get(`${API_HOST}/courses/${id}/certificate`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: "blob",
    });
    //const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(response.data);
    return imageObjectURL;
  } catch (error) {
    console.log("Req error: ", error);
  }
}
