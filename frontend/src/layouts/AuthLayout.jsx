import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mb-8 text-center">
        <Link to="/" className="text-2xl font-semibold text-slate-800">
          Expense Tracker
        </Link>
      </div>
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
