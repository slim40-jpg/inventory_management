const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du dépôt est requis'],
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'La localisation est requise'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  capacity: {
    total: {
      type: Number,
      required: [true, 'La capacité totale est requise'],
      min: [1, 'La capacité doit être au moins 1']
    },
    used: {
      type: Number,
      default: 0
    }
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: String,
    required: [true, 'L\'entreprise est requise']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  contactPhone: String,
  contactEmail: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

depotSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

depotSchema.virtual('available').get(function() {
  return this.capacity.total - this.capacity.used;
});

depotSchema.virtual('usagePercentage').get(function() {
  return (this.capacity.used / this.capacity.total) * 100;
});

depotSchema.set('toJSON', { virtuals: true });
depotSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Depot', depotSchema);