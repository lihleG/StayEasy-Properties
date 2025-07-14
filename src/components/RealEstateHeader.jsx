import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
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

          {/* Desktop Links */}
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

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
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
              className="hidden md:inline bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              Add Property
            </button>

            {/* Burger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-2xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-6 z-50 transition-all duration-300`}>
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                Add Property
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero + Search Form + Results (Unchanged) */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Existing hero and search form code continues here... */}
        {/* Leave as is - No changes to hero, search or results */}
      </div>
    </div>
  );
};

export default RealEstateHeader;



