import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
    <section className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-12">
        <div id="hero-card" className="flex-1 flex flex-col items-start justify-center animate-fadein opacity-0">
          <h1 className="text-6xl font-extrabold mb-6 text-blue-800 tracking-tight leading-tight">Welcome to <span className="text-blue-600">Booking App</span></h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-2xl leading-relaxed">Your one-stop solution for hotel bookings. Discover, compare, and book the best hotels at the best prices, just like on Goibibo!</p>
          <Link to="/hotels" className="inline-block px-10 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fadein opacity-0" id="cta-btn">Find Hotels</Link>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, []);

  return (
    <section className="w-full h-screen flex-1 flex flex-col p-0 m-0">
      {loading && !error && <Spinner />}
      {error && (
        <div className="text-center text-red-500 py-10">Failed to load hotels. Please try again later.</div>
      )}
      <iframe
        ref={iframeRef}
        src="http://localhost:5001"
        title="Hotels Microfrontend"
        className={classNames(
          "w-full h-screen border-0 bg-white transition-opacity duration-300 rounded-none",
          loading || error ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, display: 'block' }}
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
      />
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
      &copy; {new Date().getFullYear()} Booking App. Designed by a world-class UI/UX team.
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
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-full w-full bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Navbar />
        <div className="flex-1 flex flex-col w-full h-full p-0 m-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelsIframe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
// Tailwind animation (add to index.css):
// .animate-fadein { animation: fadein 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
// @keyframes fadein { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
