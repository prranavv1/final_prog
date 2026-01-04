import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const signupUser = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/auth/signup`,
    data
  );
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    data
  );
  return response.data;
};
