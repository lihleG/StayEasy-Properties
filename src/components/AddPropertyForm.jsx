import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddPropertyForm = () => {
    const [from, setForm] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        category: ''
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success('Property added!');
                setForm({ title: '', description: '', price: '', location: '', category: ''});
               } else {
                toast.error('Failed to add property');
               }
            } catch (err) {
                console.error(error);
                toast.error('Server error');
            }
        };

    return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Property</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="input" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="input" />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="input" />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="input" />
      <select name="category" value={form.category} onChange={handleChange} required className="input">
        <option value="">Choose Category</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
      </select>
      <button type="submit" className="bg-sky-600 text-white px-4 py-2 mt-4 rounded">Submit</button>
    </form>
  );
};

export default AddPropertyForm;