import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AnneteDuToit from '../assets/Annete Du Toit.png';
import ThulaniDlamini from '../assets/Thulani Dlamini.png';
import JustinFurin from '../assets/Justin Furin.png';

const RealEstateTeam = () => {
  const navigate = useNavigate(); 

  const teamMembers = [
    {
      name: "Annette Du Toit",
      phone: "(064) 029-3388",
      image: AnneteDuToit
    },
    {
      name: "Thulani Dlamini",
      phone: "(078) 618-6789",
      image: ThulaniDlamini
    },
    {
      name: "Justin Furin",
      phone: "(083) 987-6543",
      image: JustinFurin
    }
  ];

  const handleViewAllClick = () => {
    navigate('/agents'); 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Expert</h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">Meet Our Real Estate Team</h3>
        <button
          onClick={handleViewAllClick} 
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          View All Members
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col"
          >
            <div className="relative pb-[100%] overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="mb-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{member.phone}</span>
                </div>
              </div>
              
              <button className="mt-auto w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition flex items-center justify-center">
                Contact
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateTeam;
