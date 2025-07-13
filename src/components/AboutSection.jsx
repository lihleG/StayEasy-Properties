import React, { useState } from 'react';

const AboutSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties?search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('❌ Search failed:', error);
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About StayEasy</h2>
          <h3 className="text-4xl font-bold text-blue-300">Welcome To StayEasy</h3>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Text content */}
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-8">
              StayEasy is a premier property platform based in South Africa, with a proven track record of excellence.
              We've facilitated property sales exceeding 3.7 billion rand in value and currently manage over 300
              premium properties across the globe. Our commitment to quality service and innovative solutions makes
              us the trusted choice for buyers and sellers worldwide.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">→</span>
                <span className="text-gray-700">24-hour dedicated client support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">→</span>
                <span className="text-gray-700">Priority access to premium listings</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">→</span>
                <span className="text-gray-700">Immediate 24/7 emergency assistance</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-8 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">3.7B+</p>
                <p className="text-gray-600">Property Value</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">300+</p>
                <p className="text-gray-600">Global Properties</p>
              </div>
            </div>

            <button className="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              Explore Listings
            </button>
          </div>

          {/* Right side - Search box on image */}
          <div className="lg:w-1/2 rounded-lg min-h-[400px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
              alt="Luxury StayEasy Property"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center p-6">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md w-full">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Find Your Dream Home</h4>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-300"
                >
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((property) => (
              <div key={property._id} className="bg-white shadow-lg rounded-lg p-4">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-blue-300 font-semibold">R{property.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;


