const ExpenseCard = ({ expense, onDelete }) => {
    return (
      <div className="mb-3 rounded-lg border p-4 shadow-sm">
        <h3 className="text-lg font-semibold">{expense.title}</h3>
  
        <p>₹ {expense.amount}</p>
  
        <p className="text-sm text-slate-500">
          {expense.category}
        </p>
  
        {expense.description && (
          <p className="mt-2 text-sm">
            {expense.description}
          </p>
        )}
  
        <button
          onClick={() => onDelete(expense._id)}
          className="mt-3 rounded bg-red-500 px-3 py-1 text-white"
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default ExpenseCard;