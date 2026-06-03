import { useEffect, useState } from "react";

const ExpenseForm = ({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "",
        description: editingExpense.description || "",
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense._id, expenseData);
    } else {
      onAddExpense(expenseData);
    }

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border p-4 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="mb-3 w-full rounded border p-2"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="mb-3 w-full rounded border p-2"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="mb-3 w-full rounded border p-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="mb-3 w-full rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-slate-800 px-4 py-2 text-white"
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;