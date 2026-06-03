const ExpenseCard = ({ expense, onDelete, onEdit }) => {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {expense.title}
          </h3>
  
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            {expense.category}
          </span>
        </div>
  
        <p className="mt-3 text-3xl font-bold text-slate-800">
          ₹{expense.amount}
        </p>
  
        {expense.description && (
          <p className="mt-3 text-slate-600">
            {expense.description}
          </p>
        )}
  
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="rounded bg-blue-600 px-3 py-1 text-white"
          >
            Edit
          </button>
  
          <button
            onClick={() => onDelete(expense._id)}
            className="rounded bg-red-600 px-3 py-1 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default ExpenseCard;