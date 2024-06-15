import axiosInstance from "./axios";

export type User = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default async function fetchUser() {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get("auth/user/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to fetch user information");
  }
}
