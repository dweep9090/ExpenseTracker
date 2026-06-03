import { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddExpense({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border p-4 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">Add Expense</h2>

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
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;