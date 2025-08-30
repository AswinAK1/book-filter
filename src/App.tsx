import { Routes, Route, Link } from "react-router-dom";
import Books from './components/login/BookList/BookList';
import Favorites from "./components/login/favourate/Favorites";
import Login from "./components/login/Login";

const App = () => {
  return (
    <div>
      <div className="p-4 bg-blue-600 text-white flex justify-between">
        <Link to="/books" className="font-bold text-xl">Book Finder</Link>
        <Link
          to="/favorites"
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-black shadow"
        >
          ⭐ Favorites
        </Link>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
