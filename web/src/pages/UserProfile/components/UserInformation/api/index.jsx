import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

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

export const updateUserInformation = async (userInformation) => {
  try {
    const response = await axios.patch(
      `${API_HOST}/users/me`,
      userInformation,
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
};
