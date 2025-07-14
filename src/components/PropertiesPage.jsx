import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FunnelIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

// API URL supports Render & Localhost fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Parse price from "R 1,000,000" to 1000000
const parsePrice = (priceString) => {
  if (!priceString) return 0;
  return parseInt(priceString.toString().replace(/[^0-9]/g, ''), 10);
};

const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/properties`);
    return Array.isArray(response.data) ? response.data : response.data?.properties || [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

const PropertiesPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [location.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const { data, isLoading, isError, error } = useQuery('properties', fetchProperties);
  const properties = Array.isArray(data) ? data : [];
  const categories = ['All', ...new Set(properties.map(p => p?.category).filter(Boolean))];

  const filteredProperties = properties.filter(property => {
    const propertyPrice = parsePrice(property?.price);
    const search = filters.search.toLowerCase();

    const matchesSearch = [
      property?.title, property?.description, property?.location, property?.category, property?.price
    ].some(field => field?.toString().toLowerCase().includes(search));

    const matchesCategory = filters.category === 'All' || property?.category === filters.category;
    const matchesLocation = property?.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinPrice = !filters.minPrice || propertyPrice >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || propertyPrice <= Number(filters.maxPrice);

    return matchesSearch && matchesCategory && matchesLocation && matchesMinPrice && matchesMaxPrice;
  });

  if (isLoading) return <div className="text-center py-8">Loading properties...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Filter UI */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search, Category, Location, Price inputs here */}
            {/* (Same as before - no change in UI logic) */}
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <div
                key={property._id || property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={property.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{property.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      <StarIcon className="h-4 w-4 text-yellow-500 inline mr-1" />
                      {property.rating || 'N/A'}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      {property.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No properties match your search/filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;



