import { FaEdit, FaEye, FaMoneyBillWave, FaSuitcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function EmployeeButtons({ _id }) {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition cursor-pointer"
        onClick={() => navigate(`/admin/dashboard/employees/${_id}`)}
      >
        <FaEye />
        View
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-sm rounded-md hover:bg-amber-600 transition cursor-pointer"
        onClick={() => navigate(`/admin/dashboard/employee/edit/${_id}`)}
      >
        <FaEdit />
        Edit
      </button>
    </div>
  );
}
