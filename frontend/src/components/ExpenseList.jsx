import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return (
      <p className="text-slate-500">
        No expenses found.
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">
        Your Expenses
      </h2>

      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ExpenseList;