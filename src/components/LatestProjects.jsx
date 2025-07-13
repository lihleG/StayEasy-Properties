import React, { useState } from 'react';
import lasVegas from '../assets/las-vegas.jpeg';
import clifftonBeach from '../assets/cliffton-beach.jpeg';
import newYork from '../assets/new-york.jpeg';
import london from '../assets/london.jpeg'; // Add more images as needed
import dubai from '../assets/dubai.jpeg';
import tokyo from '../assets/toyko.jpeg';

const LatestProjects = () => {
  const initialProjects = [
    { id: 1, name: 'Las Vegas, US', listings: 3, image: lasVegas },
    { id: 2, name: 'Cliffton Beach, SA', listings: 13, image: clifftonBeach },
    { id: 3, name: 'New York, US', listings: 3, image: newYork },
  ];

  const extraProjects = [
    { id: 4, name: 'London, UK', listings: 8, image: london },
    { id: 5, name: 'Dubai, UAE', listings: 10, image: dubai },
    { id: 6, name: 'Tokyo, Japan', listings: 5, image: tokyo },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [showingAll, setShowingAll] = useState(false);

  const handleViewAll = () => {
    if (!showingAll) {
      setProjects([...projects, ...extraProjects]);
      setShowingAll(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Latest Projects</h2>
        <h3 className="text-3xl font-semibold text-gray-700">Meet Our Latest Real Estate Projects</h3>
      </div>

      <div className="flex justify-between items-center mb-8">
        <p className="text-lg text-gray-600">Explore More</p>
        {!showingAll && (
          <button
            className="px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleViewAll}
          >
            View All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow"
          >
            <div className="mb-6">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-blue-600 mr-2">-</span>
              <span className="text-xl font-medium text-gray-700">
                {project.listings} Listings
              </span>
            </div>
            <h4 className="text-2xl font-semibold text-gray-800">{project.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProjects;
