import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Search } from "lucide-react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const Books = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get<Book[]>("http://localhost:3000/api/all-books");
        setBooks(res.data);
      } catch {
        setError("Failed to fetch books 😢");
      } finally {
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  const toggleFavorite = (book: Book) => {
    const exists = favorites.find((fav) => fav.id === book.id);
    setFavorites(
      exists ? favorites.filter((fav) => fav.id !== book.id) : [...favorites, book]
    );
  };

  const isFavorite = (bookId: string) => favorites.some((fav) => fav.id === bookId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          📚 Book Finder
        </h1>

        <div className="flex items-center bg-white shadow-md rounded-2xl px-4 py-2 mb-8 max-w-lg mx-auto border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full bg-transparent outline-none text-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-center text-red-600 font-medium mb-4">{error}</div>
        )}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books
              .filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={
                      book.thumbnail || "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={book.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {book.authors?.length > 0
                        ? book.authors.join(", ")
                        : "Unknown Author"}
                    </p>

                    <button
                      onClick={() => toggleFavorite(book)}
                      className={`flex items-center justify-center gap-2 mt-auto px-4 py-2 rounded-xl font-medium text-white shadow-md transition ${
                        isFavorite(book.id)
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(book.id) ? "fill-white" : "fill-none"
                        }`}
                      />
                      {isFavorite(book.id) ? "Remove Favorite" : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
