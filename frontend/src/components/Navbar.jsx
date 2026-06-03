import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-800">
          Expense Tracker
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-slate-600">
              Hello, {user.name}
            </span>
          )}
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
