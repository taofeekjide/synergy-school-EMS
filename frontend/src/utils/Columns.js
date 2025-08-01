export const columns = [
  {
    name: "S/No",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const leaveColumns = [
  {
    name: "S/No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "180px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    center: "true",
  },
];
export const employeeColumns = [
  {
    name: "S/No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
    width: "180px",
  },
  {
    name: "Designation/Position",
    selector: (row) => row.designation,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    center: "true",
  },
];
