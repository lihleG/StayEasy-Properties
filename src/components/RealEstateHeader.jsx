import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import headerImage from '../assets/header_img.png';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDc7Af1_KNMkDLfCzH1i8-Il3MfqOG8Krc",
  authDomain: "stayeasy-41b2a.firebaseapp.com",
  projectId: "stayeasy-41b2a",
  appId: "1:58862280402:web:d68929cb9c8d9559c6970b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const RealEstateHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      toast.success(`Welcome, ${loggedInUser.displayName}`, { position: 'top-right' });
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Login failed. Please try again.', { position: 'top-right' });
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (location) params.append('location', location);
      const res = await fetch(`https://stayeasy-backend.onrender.com/api/properties?${params.toString()}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/PropertiesPage' },
    { name: 'Agents', path: '/agents' },
    { name: 'Contact', path: '/ContactUs' },
  ];

  return (
    <div className="font-sans">
      <ToastContainer />
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-3xl font-bold text-sky-600">StayEasy</div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium ${scrolled ? 'text-gray-700 hover:text-sky-500' : 'text-white hover:text-sky-200'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl">
              <FaBars />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <button
                onClick={handleGoogleLogin}
                className={scrolled ? 'text-gray-700 hover:text-sky-500' : 'text-white hover:text-sky-200'}
              >
                Login
              </button>
            ) : (
              <FaUserCircle className="text-2xl text-sky-600" title={user.displayName} />
            )}

            <button
              onClick={() => navigate('/dashboard')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              Add Property
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-sky-500 font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <button
                onClick={handleGoogleLogin}
                className="bg-sky-500 text-white rounded-lg py-2 mt-4"
              >
                {user ? 'Logged In' : 'Login'}
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="bg-sky-500 text-white rounded-lg py-2 mt-2"
              >
                Add Property
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section + Search + Results */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-5xl w-full px-4 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8">
            Let's Find Your Dream Home
          </h1>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-1">
              {['General', 'Villa', 'Apartment'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab ? 'bg-sky-500 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  <option value="Johannesburg">Johannesburg</option>
                  <option value="Pretoria">Pretoria</option>
                  <option value="Cape Town">Cape Town</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="text-white text-center">Loading results...</div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((property) => (
                  <div key={property._id} className="bg-white shadow-lg rounded-lg p-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600">{property.location}</p>
                    <p className="text-blue-300 font-semibold">
                      R{property.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white text-center mt-4">No properties found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateHeader;




