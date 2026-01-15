import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname + location.search;
  const authUrl = `/auth?next=${encodeURIComponent(currentPath)}`;

  const handleAuthClick = async () => {
    // if user is logged in, log them out and bring them home (or keep same page if you prefer)
    if (auth.isAuthenticated) {
      await auth.signOut?.();
      navigate("/", { replace: true });
    } else {
      // go to auth page and return to current page after login
      navigate(authUrl);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>

      <div className="flex items-center gap-3">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>

        <button
          className="primary-button w-fit"
          onClick={handleAuthClick}
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : auth.isAuthenticated
              ? "Log out"
              : "Log in"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
