import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import EmployeeList from "./components/employees/EmployeeList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import AddEmployee from "./components/employees/AddEmployee";
import ViewEmployee from "./components/employees/ViewEmployee";
import EditEmployee from "./components/employees/Edit";
import EmployeeSummaryCard from "./components/EmployeeDashboard/Summary";
import List from "./components/leave/List";
import Add from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import LeavesTable from "./components/leave/LeavesTable";
import LeaveDetail from "./components/leave/LeaveDetail";
import PublicDemo from "./pages/PublicDemo";
import LandingPage from "./pages/LandingPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/public-demo" element={<PublicDemo />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route
            path="/admin/dashboard/departments"
            element={<DepartmentList />}
          />
          <Route
            path="/admin/dashboard/add-department"
            element={<AddDepartment />}
          />
          <Route
            path="/admin/dashboard/department/:id"
            element={<EditDepartment />}
          />
          <Route path="/admin/dashboard/employees" element={<EmployeeList />} />
          <Route
            path="/admin/dashboard/add-employee"
            element={<AddEmployee />}
          />
          <Route
            path="/admin/dashboard/employees/:id"
            element={<ViewEmployee />}
          />
          <Route
            path="/admin/dashboard/employee/edit/:id"
            element={<EditEmployee />}
          />
          <Route
            path="/admin/dashboard/leaves"
            element={<LeavesTable />}
          />
          <Route
            path="/admin/dashboard/leaves/:id"
            element={<LeaveDetail />}
          />
        </Route>
        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummaryCard />} />
          <Route
            path="/employee/dashboard/profile/:id"
            element={<ViewEmployee />}
          />
          <Route path="/employee/dashboard/leaves" element={<List />} />
          <Route path="/employee/dashboard/add-leave" element={<Add />} />
          <Route path="/employee/dashboard/setting" element={<Setting />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
