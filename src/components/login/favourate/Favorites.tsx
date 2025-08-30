import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        ⭐ My Favorite Books
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
            alt="No favorites"
            className="w-40 mx-auto mb-4 opacity-70"
          />
          <p className="text-lg">No favorite books yet! Start adding some 📖✨</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={book.thumbnail || "https://via.placeholder.com/150?text=No+Image"}
                alt={book.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.authors?.length > 0 ? book.authors.join(", ") : "Unknown Author"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default Favorites;
