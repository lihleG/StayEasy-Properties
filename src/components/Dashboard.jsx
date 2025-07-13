import REact, { useState } from 'react';

const Dashboard = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        type: '',
        purpose: 'sale',
        image: null,
    });

const [message, setMessage] = useState('');

const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
        setForm({ ...form, image: files[0]});
    } else {
        setForm({ ...form, [name]: value });
    }
};

const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if(
        !form.title ||
      !form.description ||
      !form.location ||
      !form.price ||
      !form.type ||
      !form.purpose ||
      !form.image
    ) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Simulate success message
    setMessage('✅ Property listing submitted successfully!');
    setForm({
      title: '',
      description: '',
      location: '',
      price: '',
      type: '',
      purpose: 'sale',
      image: null,
    });

    // Clear file input manually
    document.getElementById('imageInput').value = '';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Add New Property</h2>

        {message && (
          <div className="mb-4 px-4 py-3 rounded bg-blue-100 text-blue-700 border border-blue-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Modern Villa in Sandton"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Describe the property..."
            />
          </div>

          {/* Location & Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. Fourways, Cape Town, Durban"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Price (ZAR)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. 1500000"
                min="0"
              />
            </div>
          </div>

          {/* Type & Purpose */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Property Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Commercial">Commercial</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Purpose</label>
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              id="imageInput"
              onChange={handleChange}
              accept="image/*"
              className="w-full border border-gray-300 p-2 rounded bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
