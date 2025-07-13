import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Property title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Property description is required'] 
  },
 category: {
  type: String,
  required: [true, 'Property category is required'],
  enum: ['Villa', 'Apartment', 'Penthouse', 'Mansion', 'Bungalow', 'Condo', 'Chalet', 'House', 'Commercial', 'Warehouse', 'Homestay']
},

  price: { 
    type: Number, 
    required: [true, 'Property price is required'],
    min: [10000, 'Price must be at least $10,000']
  },
  location: { 
    type: String, 
    required: [true, 'Property location is required'] 
  },
  image: { 
    type: String,
    default: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  },
  rating: { 
    type: Number, 
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  phone: { 
    type: String,
    validate: {
      validator: function(v) {
        // Simple phone number validation
        return /\+\d{1,3} \d{1,14}([- ]?\d{1,13})?/.test(v);
      },
     message: props => `${props.value} is not a valid phone number!`
 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add text index for search
propertySchema.index({ title: 'text', description: 'text', location: 'text' });

// Virtual for formatted price
propertySchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(this.price);
});

// Virtual for country code (for flag display)
propertySchema.virtual('countryCode').get(function() {
  const countryMap = {
    'USA': 'us',
    'South Africa': 'za',
    'Australia': 'au',
    'UAE': 'ae',
    'Namibia': 'na',
    'Egypt': 'eg',
    'Brazil': 'br',
    'Japan': 'jp',
    'Switzerland': 'ch',
    'Indonesia': 'id'
  };
  
  for (const [country, code] of Object.entries(countryMap)) {
    if (this.location.includes(country)) {
      return code;
    }
  }
  return 'globe'; // default globe icon
});

const Property = mongoose.model('Property', propertySchema);

export default Property;