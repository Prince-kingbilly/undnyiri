import salaryModel from "../model/salary-model.js";

// CREATE
export const creatsalary = async (req, res) => {
  try {
    const { GlossSalary, TotalDeduction, NetSalary, month } = req.body;

    const created = await salaryModel.create({
      GlossSalary,
      TotalDeduction,
      NetSalary,
      month,
    });

    return res.status(201).json({ data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to create salary" });
  }
};

// READ ALL
export const findSalary = async (req, res) => {
  try {
    const all = await salaryModel.find();
    return res.status(200).json({ data: all });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to fetch salaries" });
  }
};

// READ ONE
export const findss = async (req, res) => {
  try {
    const { id } = req.params;
    const one = await salaryModel.findById(id);

    if (!one) return res.status(404).json({ message: "Salary not found" });

    return res.status(200).json({ data: one });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to fetch salary" });
  }
};

// UPDATE
export const updatSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { GlossSalary, TotalDeduction, NetSalary, month } = req.body;

    const updated = await salaryModel.findByIdAndUpdate(
      id,
      { GlossSalary, TotalDeduction, NetSalary, month },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Salary not found" });

    return res.status(200).json({ data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to update salary" });
  }
};

// DELETE
export const deletSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await salaryModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Salary not found" });

    return res.status(200).json({ data: deleted });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to delete salary" });
  }
};

