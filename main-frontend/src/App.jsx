import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import PaymentDrawer from './PaymentDrawer';
import { API_ENDPOINTS } from './config/api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-md">
      <ellipse cx="150" cy="200" rx="120" ry="18" fill="#e0e7ff" />
      <rect x="60" y="120" width="180" height="60" rx="16" fill="#3b82f6" />
      <rect x="80" y="100" width="140" height="40" rx="12" fill="#60a5fa" />
      <rect x="120" y="60" width="60" height="40" rx="10" fill="#93c5fd" />
      <circle cx="150" cy="50" r="18" fill="#fbbf24" />
      <rect x="140" y="80" width="20" height="10" rx="3" fill="#fbbf24" />
      <rect x="170" y="130" width="30" height="10" rx="3" fill="#fbbf24" />
      <rect x="100" y="130" width="30" height="10" rx="3" fill="#fbbf24" />
    </svg>
  );
}

function Home() {
  useEffect(() => {
    const hero = document.getElementById('hero-card');
    if (hero) {
      hero.classList.add('animate-fadein');
    }
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-0 m-0">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-0 md:px-0 py-0 gap-0">
        <div id="hero-card" className="flex-1 flex flex-col items-start justify-center animate-fadein opacity-0 px-8">
          <h1 className="text-6xl font-extrabold mb-6 text-blue-800 tracking-tight leading-tight">Welcome to <span className="text-blue-600">Booking App</span></h1>
          <p className="text-2xl text-gray-700 mb-8 leading-relaxed w-full">Your one-stop solution for hotel bookings. Discover, compare, and book the best hotels at the best prices, just like on Goibibo!</p>
          <Link to="/hotels" className="inline-block px-10 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fadein opacity-0" id="cta-btn">Find Hotels</Link>
        </div>
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center items-center h-full w-full py-10">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );
}

function HotelsIframe() {
  const [loading, setLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [search, setSearch] = useState({
    area: '',
    checkin: '',
    checkout: '',
    guests: 2,
    rooms: 1,
  });
  const [iframeKey, setIframeKey] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);

  // Fetch locations from backend on mount
  useEffect(() => {
    fetch(API_ENDPOINTS.HOTELS.LOCATIONS)
      .then(res => res.ok ? res.json() : [])
      .then(data => setAvailableLocations(Array.isArray(data) ? data : []))
      .catch(() => setAvailableLocations([]));
  }, []);

  // Default today/tomorrow for checkin/checkout
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setSearch((s) => ({
      ...s,
      checkin: s.checkin || today.toISOString().slice(0, 10),
      checkout: s.checkout || tomorrow.toISOString().slice(0, 10),
    }));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearch((s) => ({ ...s, [name]: value }));
    if (name === 'area') {
      if (value.length > 0) {
        setLocationSuggestions(
          availableLocations.filter((loc) =>
            loc.toLowerCase().includes(value.toLowerCase())
          )
        );
        setShowSuggestions(true);
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (loc) => {
    setSearch((s) => ({ ...s, area: loc }));
    setLocationSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowIframe(false);
    setTimeout(() => {
      setLoading(false);
      setShowIframe(true);
      setIframeKey((k) => k + 1); // force iframe reload
    }, 2000);
  };

  // Build query string for iframe
  const query = new URLSearchParams({
    area: search.area,
    checkin: search.checkin,
    checkout: search.checkout,
    guests: search.guests,
    rooms: search.rooms,
  }).toString();

  return (
    <section className="w-full min-h-screen flex-1 flex flex-col p-0 m-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full flex flex-wrap md:flex-nowrap items-end justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow px-2 py-3 mb-4 mt-6 max-w-5xl mx-auto border border-orange-300"
        autoComplete="off"
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        <div className="flex flex-col flex-1 min-w-[140px] relative">
          <label className="text-xs font-semibold text-white mb-1 ml-1">AREA, LANDMARK OR PROPERTY NAME</label>
          <input
            name="area"
            value={search.area}
            onChange={handleInput}
            placeholder="Delhi"
            className="rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200"
            required
            autoComplete="off"
            onFocus={() => search.area && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto text-base">
              {locationSuggestions.map((loc) => (
                <li
                  key={loc}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
                  onMouseDown={() => handleSuggestionClick(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label className="text-xs font-semibold text-white mb-1 ml-1">CHECKIN</label>
          <input
            name="checkin"
            type="date"
            value={search.checkin}
            onChange={handleInput}
            className="rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200"
            required
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label className="text-xs font-semibold text-white mb-1 ml-1">CHECKOUT</label>
          <input
            name="checkout"
            type="date"
            value={search.checkout}
            onChange={handleInput}
            className="rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200"
            required
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label className="text-xs font-semibold text-white mb-1 ml-1">GUEST & ROOMS</label>
          <div className="flex items-center gap-2">
            <input
              name="guests"
              type="number"
              min="1"
              value={search.guests}
              onChange={handleInput}
              className="rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 w-16"
            />
            <span className="inline-block text-white font-semibold">Adults</span>
            <input
              name="rooms"
              type="number"
              min="1"
              value={search.rooms}
              onChange={handleInput}
              className="rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 w-16"
            />
            <span className="inline-block text-white font-semibold">Room</span>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md px-6 py-2 bg-white text-blue-700 font-bold text-base shadow hover:bg-blue-50 transition border-2 border-white mt-5 md:mt-0"
        >
          Update Search
        </button>
      </form>
      {/* Skeleton Loader for Cards Only */}
      <div className="flex-1 flex flex-col items-center w-full h-full min-h-[400px]">
        {loading && (
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg h-64 animate-pulse flex flex-col p-6"></div>
            ))}
          </div>
        )}
        {/* Hotels Iframe */}
        {showIframe && !loading && (
          <>
            {import.meta.env.VITE_HOTEL_SERVICE_URL ? (
              <iframe
                key={iframeKey}
                src={`${import.meta.env.VITE_HOTEL_SERVICE_URL}?${query}`}
                title="Hotels Microfrontend"
                className="w-full h-screen border-0 bg-white transition-opacity duration-300 rounded-none"
                style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, display: 'block' }}
              />
            ) : (
              <div className="text-red-600 font-bold text-center mt-10">
                Error: VITE_HOTEL_SERVICE_URL is not set in your .env file.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow-lg flex items-center px-8 py-5 border-b border-blue-100 sticky top-0 z-20 h-16 min-h-[64px]">
      <div className="flex-1 flex items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-tight flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.25 10.5 8.13 11.13.22.16.52.16.74 0C13.75 21.5 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.13 18.13 5 14.36 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.36-5.13 7.13-7 8.88z"/><circle cx="12" cy="11" r="2.5"/></svg>
          Booking App
        </Link>
      </div>
      <div className="space-x-6 flex items-center">
        <Link to="/" className={classNames(
          "text-lg font-medium transition px-2 py-1 border-b-2",
          location.pathname === "/"
            ? "text-blue-700 border-blue-600"
            : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-400"
        )}>Home</Link>
        <Link to="/hotels" className={classNames(
          "text-lg font-medium transition px-2 py-1 border-b-2",
          location.pathname === "/hotels"
            ? "text-blue-700 border-blue-600"
            : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-400"
        )}>Hotels</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full text-center py-4 text-gray-500 text-sm border-t border-blue-100 bg-white h-14 min-h-[56px] flex items-center justify-center">
      &copy; {new Date().getFullYear()} Booking App. 
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      const cta = document.getElementById('cta-btn');
      if (cta) cta.classList.remove('opacity-0');
    }, 400);
  }, []);
  const location = window.location.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Listen for postMessage from Hotels micro frontend
  const handleMessage = useCallback((event) => {
    if (event.data && event.data.type === 'BOOK_HOTEL') {
      const hotelData = event.data.hotel;
      if (hotelData && hotelData.id) {
        // Use the complete hotel data from postMessage instead of fetching from backend
        console.log('Received hotel data from postMessage:', hotelData);
        setSelectedHotel(hotelData);
        setDrawerOpen(true);
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen h-full w-full bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Navbar />
        <div className={location === '/hotels' ? 'flex-1 flex flex-col w-full h-full p-0 m-0' : 'flex-1 flex flex-col w-full'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelsIframe />} />
          </Routes>
        </div>
        <Footer />
        <PaymentDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} hotel={selectedHotel} />
      </div>
    </Router>
  );
}
// Tailwind animation (add to index.css):
// .animate-fadein { animation: fadein 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
// @keyframes fadein { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
