import axios from "axios";

export async function fetchDepartments() {
  let departments;

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
}
