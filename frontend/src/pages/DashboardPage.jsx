import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

import {
  createExpense,
  getExpenses,
  deleteExpense,
} from "../services/expenseService";

const DashboardPage = () => {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (expenseData) => {
    try {
      const expense = await createExpense(expenseData);

      setExpenses((prev) => [expense, ...prev]);

      setMessage(`Expense "${expense.title}" added successfully!`);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Failed to create expense"
      );
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );

      setMessage("Expense deleted successfully!");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold text-slate-800">
        Dashboard
      </h1>

      <p className="mb-6 text-slate-600">
        Welcome, {user?.name}
      </p>

      {message && (
        <div className="mb-4 rounded bg-slate-100 p-3">
          {message}
        </div>
      )}

      <ExpenseForm onAddExpense={handleAddExpense} />

      <hr className="my-6" />

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          onDelete={handleDeleteExpense}
        />
      )}
    </div>
  );
};

export default DashboardPage;