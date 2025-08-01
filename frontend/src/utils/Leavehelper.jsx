import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export function LeaveButtons({ Id }) {
  const navigate = useNavigate();

  function handleView(id) {
    navigate(`/admin/dashboard/leaves/${id}`);
  }

  return (
    <button
      onClick={() => handleView(Id)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
    >
      <FaEye className="w-4 h-4" />
      View
    </button>
  );
}
