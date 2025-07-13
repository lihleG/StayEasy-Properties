import React, { useState } from "react";
import { FaRulerCombined, FaBed, FaBath, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const PropertyCard = () => {

  const navigate = useNavigate();

  const goToDetailsPage = () => {
    navigate("/PropertiesPage", { state: {property }});
  };

  const propertyCategories = {
    General: [
      {
        id: 1,
        title: "Modern Family Home",
        location: "Johannesburg, Sandton",
        size: "220m²",
        bedrooms: 4,
        bathrooms: 3,
        price: "R 3,250,000",
        description: "Spacious family home with modern amenities in a secure estate",
        features: ["Swimming pool", "Double garage", "Garden", "Study"],
        premium: true,
        image: "https://images.unsplash.com/photo-1706164971299-cfa23ec76083?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      },
      {
        id: 2,
        title: "Urban Loft Apartment",
        location: "Cape Town, City Bowl",
        size: "85m²",
        bedrooms: 1,
        bathrooms: 1,
        price: "R 1,850,000",
        description: "Stylish loft apartment with panoramic city views",
        features: ["Open plan", "Secure parking", "Balcony", "Near restaurants"],
        premium: false,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    Apartment: [
      {
        id: 3,
        title: "Luxury Waterfront Apartment",
        location: "Durban, Umhlanga",
        size: "150m²",
        bedrooms: 2,
        bathrooms: 2,
        price: "R 4,500,000",
        description: "Premium apartment with ocean views and resort-style amenities",
        features: ["Sea views", "Gym access", "Concierge", "Infinity pool"],
        premium: true,
        image: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=913&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 4,
        title: "City Center Studio",
        location: "Pretoria, CBD",
        size: "45m²",
        bedrooms: 0,
        bathrooms: 1,
        price: "R 850,000",
        description: "Compact studio apartment in the heart of the city",
        features: ["24/7 security", "Near public transport", "Modern kitchenette"],
        premium: false,
        image: "https://images.unsplash.com/photo-1631048501831-46856f9eaaf2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    Villa: [
      {
        id: 5,
        title: "Exclusive Mountain Villa",
        location: "Western Cape, Franschhoek",
        size: "480m²",
        bedrooms: 5,
        bathrooms: 4,
        price: "R 12,500,000",
        description: "Luxury villa with breathtaking mountain views and wine estate access",
        features: ["Private pool", "Wine cellar", "Guest cottage", "Panoramic views"],
        premium: true,
        image: "https://images.unsplash.com/photo-1578439297699-eb414262c2de?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 6,
        title: "Beachfront Villa",
        location: "Eastern Cape, Jeffrey's Bay",
        size: "320m²",
        bedrooms: 4,
        bathrooms: 3,
        price: "R 8,900,000",
        description: "Stunning beachfront property with direct beach access",
        features: ["Private beach access", "Rooftop terrace", "Ocean views", "Entertainment area"],
        premium: true,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZpbGxhfGVufDB8fDB8fHww"
      }
    ]
  };

  const categories = Object.keys(propertyCategories);
  const [activeCategory, setActiveCategory] = useState("General");
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  const currentProperties = propertyCategories[activeCategory];
  const property = currentProperties[currentPropertyIndex];

  const nextProperty = () => {
    setCurrentPropertyIndex(prevIndex =>
      prevIndex === currentProperties.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProperty = () => {
    setCurrentPropertyIndex(prevIndex =>
      prevIndex === 0 ? currentProperties.length - 1 : prevIndex - 1
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPropertyIndex(0); // Reset to first property when changing category
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Book Property</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            Discover your perfect property Match
          </h2>
        </div>

        {/* Property Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-3 rounded-full transition-all duration-300 font-medium ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Property Display */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Property Image */}
            <div className="md:w-1/2 h-80 md:h-auto relative bg-gradient-to-br from-blue-200 to-blue-300">
              <div className="absolute inset-0">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Premium Badge */}
              {property.premium && (
                <div className="absolute top-5 left-5 bg-yellow-400 text-gray-900 font-bold py-1 px-3 rounded-full text-sm flex items-center">
                  <FaStar className="mr-1" /> Premium
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                  onClick={prevProperty}
                  className="bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextProperty}
                  className="bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800">{property.title}</h3>
              <p className="text-gray-600 mt-1">Location: {property.location}</p>
              <p className="mt-4 text-blue-600">{property.description}</p>

              <div className="flex gap-6 mt-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaRulerCombined className="text-blue-500" />
                  <span>{property.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBed className="text-blue-500" />
                  <span>{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-blue-500" />
                  <span>{property.bathrooms} baths</span>
                </div>
              </div>

              {/* Property Features */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{property.price}</p>
                  <p className="text-gray-600 text-sm">
                    {activeCategory === "Apartment" ? "for sale" : "asking price"}
                  </p>
                </div>

                <button
                onClick={goToDetailsPage}
                className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center font-medium"
                >
                  View Details
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-gray-700">
            Showing {currentPropertyIndex + 1} of {currentProperties.length} in {activeCategory}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={prevProperty}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <FaChevronLeft className="mr-1" /> PREV
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              onClick={nextProperty}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              NEXT <FaChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

        

