import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FunnelIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

// Full properties data embedded here:
const properties = [
  // VILLAS
  {
    title: "Modern Villa in Camps Bay",
    description: "A luxurious villa with a sea view and infinity pool.",
    category: "Villa",
    price: 125000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    isPopular: true,
    rating: 4.8,
    reviewCount: 21,
    phone: "+27 82 123 4567",
  },
  {
    title: "Hout Bay Luxury Villa",
    description: "Elegant villa with pool and mountain views.",
    category: "Villa",
    price: 200000,
    location: "Hout Bay, South Africa",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    isPopular: false,
    rating: 4.6,
    reviewCount: 15,
    phone: "+27 83 111 2222",
  },
  {
    title: "Coastal Villa Retreat",
    description: "Stylish coastal villa, walking distance to the beach.",
    category: "Villa",
    price: 145000,
    location: "Jeffreys Bay, South Africa",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    isPopular: true,
    rating: 4.7,
    reviewCount: 18,
    phone: "+27 84 333 4444",
  },
  {
    title: "Luxury Vineyard Villa",
    description: "Classic villa overlooking vineyards in Stellenbosch.",
    category: "Villa",
    price: 175000,
    location: "Stellenbosch, South Africa",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    isPopular: false,
    rating: 4.5,
    reviewCount: 12,
    phone: "+27 85 555 6666",
  },
  {
    title: "Mountain View Villa",
    description: "Quiet villa nestled near mountain trails.",
    category: "Villa",
    price: 160000,
    location: "Drakensberg, South Africa",
    image:
      "https://images.unsplash.com/photo-1700145382757-b406132cd307?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPopular: true,
    rating: 4.9,
    reviewCount: 27,
    phone: "+27 86 777 8888",
  },
  {
    title: "Contemporary Villa Estate",
    description: "Spacious modern villa with outdoor entertainment area.",
    category: "Villa",
    price: 230000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    isPopular: false,
    rating: 4.4,
    reviewCount: 14,
    phone: "+27 87 999 0000",
  },

  // COMMERCIAL
  {
    title: "Prime Office Space",
    description: "Modern office space in Sandton central business district.",
    category: "Commercial",
    price: 250000,
    location: "Sandton, Johannesburg",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    isPopular: true,
    rating: 4.7,
    reviewCount: 34,
    phone: "+27 82 345 6789",
  },
  {
    title: "Urban Office Building",
    description: "Glass-clad commercial tower with premium amenities.",
    category: "Commercial",
    price: 300000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    isPopular: false,
    rating: 4.6,
    reviewCount: 20,
    phone: "+27 83 222 3333",
  },
  {
    title: "Downtown Commercial Plaza",
    description: "Retail and office units in high foot-traffic location.",
    category: "Commercial",
    price: 275000,
    location: "Durban, South Africa",
    image:
      "https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29tbWVyY2lhbCUyMHBsYXphfGVufDB8fDB8fHww",
    isPopular: true,
    rating: 4.5,
    reviewCount: 29,
    phone: "+27 84 444 5555",
  },
  {
    title: "Corporate Office Suite",
    description: "High-rise premium office with sweeping city views.",
    category: "Commercial",
    price: 320000,
    location: "Pretoria, South Africa",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    isPopular: false,
    rating: 4.8,
    reviewCount: 22,
    phone: "+27 85 666 7777",
  },
  {
    title: "Mixed-Use Commercial Hub",
    description: "Retail shops and offices in mixed-use development.",
    category: "Commercial",
    price: 260000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    isPopular: true,
    rating: 4.6,
    reviewCount: 18,
    phone: "+27 86 888 9999",
  },
  {
    title: "Business Park Unit",
    description: "Secure unit with private parking and utilities.",
    category: "Commercial",
    price: 210000,
    location: "Umhlanga Ridge, Durban",
    image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1",
    isPopular: false,
    rating: 4.3,
    reviewCount: 15,
    phone: "+27 87 111 2222",
  },

  // WAREHOUSE
  {
    title: "Industrial Warehouse",
    description: "Spacious warehouse with loading docks and offices.",
    category: "Warehouse",
    price: 320000,
    location: "Midrand, Gauteng",
    image:
      "https://images.unsplash.com/photo-1669003153363-6d7ba8e20c7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZHVzdHJpYWwlMjB3YXJlaG91c2V8ZW58MHx8MHx8fDA%3D",
    isPopular: true,
    rating: 4.8,
    reviewCount: 27,
    phone: "+27 84 777 8899",
  },
  {
    title: "Cold Storage Warehouse",
    description: "Temperature-controlled warehouse for perishables.",
    category: "Warehouse",
    price: 340000,
    location: "Cape Town, South Africa",
    image:
      "https://plus.unsplash.com/premium_photo-1670315266772-ae45debb9c52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZHVzdHJpYWwlMjB3YXJlaG91c2V8ZW58MHx8MHx8fDA%3D",
    isPopular: false,
    rating: 4.4,
    reviewCount: 19,
    phone: "+27 83 333 4444",
  },
  {
    title: "Logistics Distribution Hub",
    description: "High-ceiling warehouse near major transport routes.",
    category: "Warehouse",
    price: 290000,
    location: "Johannesburg, South Africa",
    image:
      "https://plus.unsplash.com/premium_photo-1664298712153-a43bda3f7362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGluZHVzdHJpYWwlMjB3YXJlaG91c2V8ZW58MHx8MHx8fDA%3D",
    isPopular: true,
    rating: 4.7,
    reviewCount: 22,
    phone: "+27 85 444 5555",
  },
  {
    title: "Fulfillment Center",
    description: "Automated warehouse with racking systems.",
    category: "Warehouse",
    price: 360000,
    location: "Durban, South Africa",
    image:
      "https://images.unsplash.com/photo-1690613139174-5074641eaa0b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPopular: false,
    rating: 4.5,
    reviewCount: 20,
    phone: "+27 86 666 7777",
  },
  {
    title: "Secure Storage Facility",
    description: "CCTV monitored warehouse with 24/7 access.",
    category: "Warehouse",
    price: 310000,
    location: "Pretoria, South Africa",
    image:
      "https://images.unsplash.com/photo-1669003152226-b37b58281b84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGluZHVzdHJpYWwlMjB3YXJlaG91c2V8ZW58MHx8MHx8fDA%3D",
    isPopular: true,
    rating: 4.6,
    reviewCount: 18,
    phone: "+27 87 555 6666",
  },
  {
    title: "Heavy Goods Warehouse",
    description: "Large floor warehouse for industrial storage.",
    category: "Warehouse",
    price: 380000,
    location: "Midrand, Gauteng",
    image:
      "https://plus.unsplash.com/premium_photo-1670315266772-ae45debb9c52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZHVzdHJpYWwlMjB3YXJlaG91c2V8ZW58MHx8MHx8fDA%3D",
    isPopular: false,
    rating: 4.4,
    reviewCount: 16,
    phone: "+27 88 777 8888",
  },

  // APARTMENT
  {
    title: "Luxury Apartment Sandton",
    description: "Top-floor luxury apartment with modern amenities.",
    category: "Apartment",
    price: 170000,
    location: "Sandton, Johannesburg",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    isPopular: true,
    rating: 4.9,
    reviewCount: 40,
    phone: "+27 83 876 5432",
  },
  {
    title: "City Center Apartment",
    description: "Modern apartment near restaurants and shops.",
    category: "Apartment",
    price: 150000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    isPopular: false,
    rating: 4.5,
    reviewCount: 25,
    phone: "+27 84 222 3333",
  },
  {
    title: "Penthouse Suite Joburg",
    description: "Exclusive penthouse with panoramic views.",
    category: "Apartment",
    price: 200000,
    location: "Johannesburg, South Africa",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    isPopular: true,
    rating: 4.8,
    reviewCount: 22,
    phone: "+27 85 444 5555",
  },
  {
    title: "Beachfront Apartment",
    description: "Stylish apartment on the beachfront.",
    category: "Apartment",
    price: 140000,
    location: "Durban, South Africa",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    isPopular: false,
    rating: 4.4,
    reviewCount: 18,
    phone: "+27 86 333 4444",
  },
  {
    title: "Green Point Studio",
    description: "Cozy studio apartment in Green Point.",
    category: "Apartment",
    price: 90000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    isPopular: true,
    rating: 4.7,
    reviewCount: 20,
    phone: "+27 87 555 6666",
  },
  {
    title: "Upscale Apartment Sandton",
    description: "High-rise apartment with gym access.",
    category: "Apartment",
    price: 180000,
    location: "Sandton, Johannesburg",
    image:
      "https://images.unsplash.com/photo-1728016280936-8e8c2ef3da4e?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPopular: false,
    rating: 4.6,
    reviewCount: 15,
    phone: "+27 88 999 0000",
  },

  // HOMESTAY
  {
    title: "Seaside Homestay",
    description: "Charming coastal homestay, family-friendly.",
    category: "Homestay",
    price: 88000,
    location: "Plettenberg Bay, South Africa",
    image:
      "https://plus.unsplash.com/premium_photo-1661963542944-0d1fc8e66f83?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPopular: true,
    rating: 4.5,
    reviewCount: 25,
    phone: "+27 87 345 8765",
  },
  {
    title: "Garden Homestay Retreat",
    description: "Quiet homestay surrounded by lush greenery.",
    category: "Homestay",
    price: 65000,
    location: "Port Elizabeth, South Africa",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    isPopular: false,
    rating: 4.2,
    reviewCount: 14,
    phone: "+27 85 765 4321",
  },
  {
    title: "Mountain Homestay Cabin",
    description: "Rustic cabin in a scenic mountain setting.",
    category: "Homestay",
    price: 72000,
    location: "Drakensberg, South Africa",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    isPopular: true,
    rating: 4.7,
    reviewCount: 19,
    phone: "+27 86 111 2222",
  },
  {
    title: "Countryside Homestay",
    description: "Cozy cottage in the countryside.",
    category: "Homestay",
    price: 59000,
    location: "Stellenbosch, South Africa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    isPopular: true,
    rating: 4.6,
    reviewCount: 17,
    phone: "+27 88 333 4444",
  },
  {
    title: "Luxury Homestay Villa",
    description: "Upscale homestay with private pool.",
    category: "Homestay",
    price: 120000,
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    isPopular: false,
    rating: 4.4,
    reviewCount: 21,
    phone: "+27 89 555 6666",
  },
  {
    title: "Family Beach Homestay",
    description: "Homestay steps from the beach.",
    category: "Homestay",
    price: 83000,
    location: "Durban, South Africa",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    isPopular: false,
    rating: 4.5,
    reviewCount: 16,
    phone: "+27 80 777 8888",
  },
];

const PropertiesPage = () => {
  const location = useLocation();

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) setFilters((prev) => ({ ...prev, category }));
  }, [location.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Get unique categories + "All"
  const categories = ['All', ...new Set(properties.map((p) => p.category).filter(Boolean))];

  // Filter properties based on filters
  const filteredProperties = properties.filter((property) => {
    const price = property.price || 0;
    const search = filters.search.toLowerCase();

    const matchesSearch =
      property.title.toLowerCase().includes(search) ||
      property.description.toLowerCase().includes(search) ||
      property.location.toLowerCase().includes(search) ||
      property.category.toLowerCase().includes(search) ||
      property.price.toString().includes(search);

    const matchesCategory = filters.category === 'All' || property.category === filters.category;
    const matchesLocation = property.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinPrice = !filters.minPrice || price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || price <= Number(filters.maxPrice);

    return matchesCategory && matchesSearch && matchesLocation && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by title, description, location..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/6"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Filter by location"
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/4"
          />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="border border-gray-300 rounded-md px-4 py-2 w-24"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="border border-gray-300 rounded-md px-4 py-2 w-24"
          />
        </div>

        {/* Results */}
        <h2 className="mb-4 font-semibold text-lg text-gray-700">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
        </h2>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      R {property.price.toLocaleString()}
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
                      {property.rating}
                    </span>
                    <span className="text-sm text-gray-500">{property.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;






