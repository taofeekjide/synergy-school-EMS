import Department from "../models/Department.js";

export async function addDepartment(req, res) {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new Department({
      dep_name,
      description,
    });

    await newDepartment.save();
    return res.status(200).json({
      success: true,
      department: newDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Add department server error",
    });
  }
}

export async function getDepartments(req, res) {
  try {
    const departments = await Department.find();
    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get department server error",
    });
  }
}

export async function getDepartment(req, res) {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get department server error",
    });
  }
}

export async function editDepartment(req, res) {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const editedDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      }
    );
    return res.status(200).json({
      success: true,
      editedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Edit department server error",
    });
  }
}

export async function deleteDepartment(req, res) {
  try {
    const { id } = req.params;
    const deletedDepartment = await Department.findById({ _id: id });
    await deletedDepartment.deleteOne();
    return res.status(200).json({
      success: true,
      deletedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Delete department server error",
    });
  }
}
