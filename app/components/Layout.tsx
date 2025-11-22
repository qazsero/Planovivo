import { Link, NavLink } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900 flex items-center gap-2">
            <span className="w-6 h-6 bg-gray-900 rounded-sm flex items-center justify-center text-white text-xs font-bold">P</span>
            Planovivo
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <NavLink to="/app" className={({ isActive }) => isActive ? "text-gray-900" : "hover:text-gray-900 transition-colors"}>
              Demo
            </NavLink>
            <NavLink to="/consulting" className={({ isActive }) => isActive ? "text-gray-900" : "hover:text-gray-900 transition-colors"}>
              Consulting
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p className="mb-4">© {new Date().getFullYear()} Planovivo. Built for architecture & real estate professionals.</p>
          <div className="flex justify-center gap-6">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link to="/consulting" className="hover:text-gray-900 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
