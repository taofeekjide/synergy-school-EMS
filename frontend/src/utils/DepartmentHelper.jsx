import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function DepartmentButtons({ _id, onDeleteDepartment }) {
  const navigate = useNavigate();

  async function handleDelete(_id) {
    const confirm = window.confirm("Do you want to delete this department?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDeleteDepartment(_id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  }

  return (
    <div className="flex space-x-2">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition cursor-pointer"
        onClick={() => navigate(`/admin/dashboard/department/${_id}`)}
      >
        <FaEdit />
        Edit
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition cursor-pointer"
        onClick={() => handleDelete(_id)}
      >
        <FaTrash />
        Delete
      </button>
    </div>
  );
}
