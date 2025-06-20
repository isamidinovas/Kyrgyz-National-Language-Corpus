import { BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Кыргыз Тилинин Корпусу
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/signUp"
              className="text-gray-900 hover:text-blue-600 bg-slate-100 transition-colors border-2 rounded-lg pr-3 pl-3"
            >
              Кируу
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
