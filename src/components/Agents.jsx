import React from 'react';
import { useNavigate } from 'react-router-dom';
import agent1 from '../assets/agent1.png';
import agent2 from '../assets/agent2.png';
import agent3 from '../assets/agent3.png';
import agent4 from '../assets/agent4.png';
import agent5 from '../assets/agent5.png';

const agentsData = [
  {
    name: 'Bongeka Twala',
    email: 'bongekatwala@stayeasy.com',
    image: agent1,
  },
  {
    name: 'Francois Steyn',
    email: 'francoissteyn@stayeasy.com',
    image: agent2,
  },
  {
    name: 'Natalie Swartz',
    email: 'natalieswartz@stayeasy.com',
    image: agent3,
  },
  {
    name: 'Vivian Reddy',
    email: 'vivianreddy@stayeasy.com',
    image: agent4,
  },
  {
    name: 'Martha Van Wyk',
    email: 'vanwyk@stayeasy.com',
    image: agent5,
  },
];

const Agents = () => {
  const navigate = useNavigate();

  const handleViewListings = () => {
    navigate('/PropertiesPage'); 
  };

  return (
    <div className="bg-white text-gray-800 px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-orange-500 text-sm font-semibold">Our Experts</h2>
        <h1 className="text-3xl font-bold text-blue-600">Meet All Our Agents</h1>
      </div>

      {/* Alphabet Filter */}
      <div className="flex justify-center mb-10 flex-wrap gap-2 text-sm font-medium text-gray-500">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <button key={letter} className="hover:text-blue-600">
            {letter}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {agentsData.map((agent, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-900">{agent.name}</h3>
            {agent.email && <p className="text-gray-500 text-sm">{agent.email}</p>}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              onClick={handleViewListings}
            >
              View All Listings
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
