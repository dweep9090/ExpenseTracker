const SummaryCard = ({ title, value }) => {
    return (
      <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 p-5 text-white shadow-md">
        <p className="text-sm opacity-80">
          {title}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>
      </div>
    );
  };
  
  export default SummaryCard;