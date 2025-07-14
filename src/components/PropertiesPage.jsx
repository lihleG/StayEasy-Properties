import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FunnelIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

// Use environment variable for API base URL, fallback to localhost for dev
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Helper to parse "R 1,000,000" to 1000000
const parsePrice = (priceString) => {
  if (!priceString) return 0;
  const cleaned = priceString.toString().replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10);
};

// API call to fetch properties
const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/properties`);
    console.log('API response data:', response.data);

    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data?.properties)) return response.data.properties;
    if (Array.isArray(response.data?.data)) return response.data.data;
    if (typeof response.data === 'object') return [response.data];

    console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
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

  // Sync category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [location.search]);

  // Update filters on input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { data, isLoading, isError, error } = useQuery('properties', fetchProperties);
  const properties = Array.isArray(data) ? data : [];
  const categories = ['All', ...new Set(properties.map(p => p?.category).filter(Boolean))];

  const filteredProperties = properties.filter(property => {
    const propertyPrice = parsePrice(property?.price);
    const search = filters.search.toLowerCase();

    const matchesSearch =
      property?.title?.toLowerCase().includes(search) ||
      property?.description?.toLowerCase().includes(search) ||
      property?.location?.toLowerCase().includes(search) ||
      property?.category?.toLowerCase().includes(search) ||
      (property?.price && property.price.toLowerCase().includes(search)); // fixed price check

    const matchesCategory =
      filters.category === 'All' || property?.category === filters.category;

    const matchesLocation =
      property?.location?.toLowerCase().includes(filters.location.toLowerCase());

    const matchesMinPrice =
      !filters.minPrice || propertyPrice >= Number(filters.minPrice);

    const matchesMaxPrice =
      !filters.maxPrice || propertyPrice <= Number(filters.maxPrice);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesLocation &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  if (isLoading) return <div className="text-center py-8">Loading properties...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
                <FunnelIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.category}
                onChange={handleFilterChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
                <MapPinIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.minPrice}
                onChange={handleFilterChange}
                min="0"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
        </div>

        {/* Property Grid */}
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
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      {property.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{property.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                      <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      {property.rating || 'N/A'}
                    </span>
                    <span className="text-sm text-gray-500">{property.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {properties.length === 0
              ? 'No properties found from API'
              : 'No properties match your search/filter'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;


