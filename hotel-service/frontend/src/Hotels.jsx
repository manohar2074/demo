import React, { useEffect, useState } from "react";

const placeholderImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");
    let url = "http://localhost:8080/api/hotels";
    if (area || checkin || checkout) {
      url = `http://localhost:8080/api/hotels/search?${params.toString()}`;
    }
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hotels");
        return res.json();
      })
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [window.location.search]);

  if (loading)
    return <div className="text-center mt-10">Loading hotels...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-white py-8 px-2 md:px-8 flex flex-col">
      {hotels.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No hotels found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-200 flex flex-col overflow-hidden group w-full"
            >
              <div className="relative w-full h-48 bg-gray-200">
                <img
                  src={placeholderImg}
                  alt={hotel.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {hotel.location}
                </span>
                <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded shadow flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                  {hotel.rating}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate" title={hotel.name}>
                  {hotel.name}
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-green-700">
                    ₹ {hotel.pricePerDay} <span className="text-sm font-normal text-gray-500">/ night</span>
                  </span>
                </div>
                <button className="mt-auto w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                  onClick={() => {
                    if (window.parent !== window) {
                      window.parent.postMessage({
                        type: 'BOOK_HOTEL',
                        hotel: {
                          id: hotel.id,
                          name: hotel.name,
                          location: hotel.location,
                          rating: hotel.rating,
                          pricePerDay: hotel.pricePerDay
                        }
                      }, '*');
                    }
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels; 