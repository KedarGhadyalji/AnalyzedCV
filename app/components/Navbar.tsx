// app/components/Navbar.tsx
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo: Quartz Signature with high-contrast Slate-900 */}
      <Link to="/" className="flex items-center no-underline group">
        <span className="text-2xl brand-first transition-colors group-hover:text-indigo-600">
          Analyzed
        </span>
        <span className="text-2xl brand-second">CV</span>
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/upload">
          {/* Refined CTA with tight tracking and black weight */}
          <button className="primary-button w-fit px-8 py-2.5 text-sm font-bold uppercase tracking-tight">
            Upload Resume
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
