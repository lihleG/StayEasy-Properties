import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, title } = formData;

    if (!name || !email || !title) {
      toast.error('Please fill in all required fields');
      return;
    }

    emailjs.send(
      'service_rfja9rk',        // ✅ Your Service ID
      'template_c1h13ak',       // ✅ Your Template ID
      formData,                 // ✅ Make sure this matches template vars
      '7jPB_pYxf9WgAYAsl'        // ✅ Your Public Key
    ).then(
      () => {
        toast.success('Message sent successfully!');
        setFormData({
          title: '',
          name: '',
          email: '',
          date: '',
          time: '',
          message: ''
        });
      },
      (error) => {
        console.error('EmailJS Error:', error);
        toast.error('Failed to send message.');
      }
    );
  };

  return (
    <div className="text-gray-800">
      <div className="grid lg:grid-cols-2 gap-10 p-8 bg-gray-100">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">To Know More About StayEasy</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">📍</div>
              <div>
                <h4 className="font-bold">Our Address</h4>
                <p>1143 Blue Crane Drive, Riverside View, Fourways, South Africa</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">⏰</div>
              <div>
                <h4 className="font-bold">Working Hours</h4>
                <p>Mon-Fri: 8 AM - 5 PM<br />Sat-Sun: 8 AM - 2 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">📞</div>
              <div>
                <h4 className="font-bold">Contact Us</h4>
                <p>+(011) 890-9000<br />+(012) 569-5678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">✉️</div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <p>StayEasy@support.com<br />contact@StayEasy.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Subject / Title*"
            required
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name*"
              required
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email*"
              required
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="time"
              value={formData.time}
              onChange={handleChange}
              type="time"
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Additional Message"
            rows="4"
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ✅ Google Map with South African Address */}
      <div className="w-full h-96">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=1143+Blue+Crane+Drive,+Fourways,+South+Africa&output=embed"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;





    
