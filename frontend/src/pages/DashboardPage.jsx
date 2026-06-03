import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCard from "../components/summaryCard";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";

const DashboardPage = () => {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  
  const totalEntries = expenses.length;
  
  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => e.amount))
      : 0;

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
  
  useEffect(() => {
    if (!message) return;
  
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [message]);

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

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const updatedExpense = await updateExpense(id, expenseData);

      setExpenses((prev) =>
        prev.map((expense) =>
          expense._id === id ? updatedExpense : expense
        )
      );

      setEditingExpense(null);

      setMessage("Expense updated successfully!");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Failed to update expense"
      );
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );

      if (editingExpense?._id === id) {
        setEditingExpense(null);
      }

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



      <div className="mb-6 grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Total Expenses"
        value={`₹${totalExpenses}`}
      />

      <SummaryCard
        title="Total Entries"
        value={totalEntries}
      />

      <SummaryCard
        title="Highest Expense"
        value={`₹${highestExpense}`}
      />
    </div>

    {message && (
    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700 shadow-sm">
      {message}
    </div>
  )}

      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />

      <hr className="my-6" />

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      )}
    </div>
  );
};

export default DashboardPage;