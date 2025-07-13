import React, { useState } from "react"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sandhurst from "../assets/Sandhurst.jpg";
import HydePark from "../assets/Hyde Park Mansion.avif";
import VillaAzure from "../assets/Villa Azure.jpeg";
import Randburg from "../assets/Randburg.jpeg";
import Umhlanga from "../assets/Umhlanga.jpeg";
import Bryanston from "../assets/Bryanston.jpeg";
import Silver from "../assets/Silver Lakes.jpeg";
import Clifton from "../assets/Clifton.jpeg";
import Waterfall from "../assets/Waterfall.jpeg";
import restuarant from "../assets/restuarant.jpeg";
import Lodge from "../assets/Lodge.jpeg";
import Luxery from "../assets/Luxery.jpeg"

const listings = [
  {
    id: 1,
    title: "Sandhurst",
    location: "Sandhurst,Sandton, Johannesburg",
    price: "R17,500,000",
    sqft: "1860 sqft",
    bed: 6,
    bath: 3,
    image: Sandhurst,
    type: "villa", 
    description: "Luxury villa in prestigious Sandhurst neighborhood" 
  },
  {
    id: 2,
    title: "Randburg",
    location: "18 Evelyn Street, Bordeaux",
    price: "R1,800,000",
    sqft: "1869 sqft",
    bed: 1,
    bath: 1,
    image: Randburg,
    type: "apartment", 
    description: "Modern apartment in Randburg" 
  },
  {
    id: 3,
    title: "Villa Azure",
    location: "Malibu, California USA",
    price: "$25,000,000",
    sqft: "12,000 sqft",
    bed: 7,
    bath: 8,
    image: VillaAzure,
    type: "villa", 
    description: "Oceanfront luxury villa with private beach" 
  },
  {
    id: 4,
    title: "Umhlanga Durban",
    location: "12 Malbora Street, umhlanga",
    price: "R2,999,000",
    sqft: "2100 sqft",
    bed: 2,
    bath: 3,
    image: Umhlanga,
    type: "apartment", 
    description: "Modern Spacious apartment with ocean views" 
  },
  {
    id: 5,
    title: "Bryanston",
    location: "207 River Road, Bryanston Drive",
    price: "R1,100,000",
    sqft: "1069 sqft",
    bed: 5,
    bath: 6,
    image: Bryanston,
    type: "apartment", 
    description: "Luxury Apartment with Spacious views" 
  },
  {
    id: 6,
    title: "Silver Lake ",
    location: "2 Bedroom Apartment, Golf Estate",
    price: "R3,700,000",
    sqft: "1900 sqft",
    bed: 3,
    bath: 2,
    image: Silver,
    type: "apartment", 
    description: "Luxury high-rise apartment" 
  },
  {
    id: 7,
    title: "Clifton Beach Villa",
    location: "Clifton Beach, Cape Town South Africa",
    price: "R55,000,000",
    sqft: "12,000 sqft",
    bed: 7,
    bath: 8,
    image: Clifton,
    type: "villa", 
    description: "Oceanfront luxury villa with private beach" 
  },
    {
    id: 8,
    title: "6 bedroom house in WaterFall Midrand",
    location: "Midrand, Waterfall",
    price: "R34,999,000",
    sqft: "11,000 sqft",
    bed: 4,
    bath: 5,
    image: Waterfall,
    type: "villa", 
    description: "Beautiful Family Home Located in the Heart of Waterfall" 
  },
 {
  id: 9,
  title: "Luxury 5-Star Hotel in Sandton",
  location: "Sandton, Johannesburg",
  price: "R12,500 per night",
  sqft: "15,000 sqft",
  bed: 120,
  bath: 130,
  image: Luxery, 
  type: "general",
  description: "Experience premium luxury and comfort in the heart of Sandton's business and entertainment district."
},
{
  id: 10,
  title: "Fine Dining Restaurant in Camps Bay",
  location: "Camps Bay, Cape Town",
  price: "R950 avg. per meal",
  sqft: "6,000 sqft",
  bed: 0,
  bath: 4,
  image: restuarant, 
  type: "general",
  description: "Elegant beachfront restaurant serving gourmet cuisine with stunning ocean views."
},
{
  id: 11,
  title: "Nature Retreat Lodge in Drakensberg",
  location: "Drakensberg, KwaZulu-Natal",
  price: "R3,200 per night",
  sqft: "9,500 sqft",
  bed: 10,
  bath: 12,
  image: Lodge, 
  type: "general",
  description: "Tranquil mountain lodge offering scenic views, hiking trails, and a peaceful getaway in nature."
}

];

const ListingCarousel = () => {
  const [activeFilter, setActiveFilter] = useState("all"); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        } 
      },
    ]
  };

  // Filter listings based on active filter
  const filteredListings = activeFilter === "all"
    ? listings
    : listings.filter(listing => listing.type === activeFilter);

  return (
    <div className="w-full py-12 px-4 relative">
      {/* Transparent overlay background */}
      <div className="absolute inset-0 bg-blue-50 bg-opacity-30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Find Home Listing in Your Area</h2>
        
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-full ${activeFilter === "all" ? 'bg-blue-300 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
          >
            All Properties
          </button>
          <button 
            onClick={() => setActiveFilter("apartment")}
            className={`px-6 py-2 rounded-full ${activeFilter === "apartment" ? 'bg-blue-300 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
          >
            Apartments
          </button>
          <button 
            onClick={() => setActiveFilter("villa")}
            className={`px-6 py-2 rounded-full ${activeFilter === "villa" ? 'bg-blue-300 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
          >
            Villas
          </button>
          <button 
            onClick={() => setActiveFilter("general")}
            className={`px-6 py-2 rounded-full ${activeFilter === "general" ? 'bg-blue-300 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
          >
            General
          </button>
        </div>

        {/* Property carousel */}
        <Slider {...settings}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className="px-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="relative overflow-hidden h-60">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-medium capitalize">{listing.type}</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-1">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{listing.location}</p>
                  <p className="text-gray-700 mb-4 text-sm">{listing.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">{listing.sqft}</span>
                    <div className="flex space-x-3">
                      <span className="text-gray-600">{listing.bed} Bed</span>
                      <span className="text-gray-600">{listing.bath} Bath</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-300">{listing.price}</span>
                    <button className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ListingCarousel;


