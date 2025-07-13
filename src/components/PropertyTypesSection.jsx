import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaWarehouse, 
  FaHome, 
  FaCity, 
  FaHotel 
} from 'react-icons/fa';

const PropertyTypesSection = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    { name: 'Commercial', count: 6, icon: <FaBuilding className="w-10 h-10" /> },
    { name: 'Warehouse', count: 6, icon: <FaWarehouse className="w-10 h-10" /> },
    { name: 'Villa', count: 6, icon: <FaHome className="w-10 h-10" /> },
    { name: 'Apartment', count: 6, icon: <FaCity className="w-10 h-10" /> },
    { name: 'Homestay', count: 6, icon: <FaHotel className="w-10 h-10" /> },
  ];

  const handleClick = (category) => {
    navigate(`/PropertiesPage?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Property By Requirement
          </h2>
          <p className="text-lg text-gray-600">
            Explore Apartment Types
          </p>
        </div>
        
        {/* Property Cards Grid - Larger Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {propertyTypes.map((property, index) => (
            <div 
              key={index}
              onClick={() => handleClick(property.name)}
              className="group bg-white rounded-xl p-8 text-center shadow-sm transition-all duration-300 cursor-pointer border border-gray-200
                         hover:-translate-y-2 hover:shadow-md hover:border-blue-400 hover:bg-blue-50"
            >
              {/* Icon with background */}
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center
                              group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-blue-600 group-hover:text-blue-800">
                  {property.icon}
                </span>
              </div>
              
              {/* Property Info */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                {property.name}
              </h3>
              <p className="text-gray-500 text-base font-medium">
                {property.count} Properties
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;

