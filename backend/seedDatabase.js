const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/UserModel');
const Depot = require('./models/DepotModel');
const Stock = require('./models/StockModel');

// Sample data
const users = [
  {
    username: "admin_john",
    email: "john@techcorp.com",
    password: "password123",
    entreprise: "TechCorp Inc.",
    phone_number: "+33 6 12 34 56 78",
    role: "admin"
  },
  {
    username: "manager_sarah",
    email: "sarah@techcorp.com",
    password: "password123",
    entreprise: "TechCorp Inc.",
    phone_number: "+33 6 23 45 67 89",
    role: "manager"
  },
  {
    username: "staff_pierre",
    email: "pierre@techcorp.com",
    password: "password123",
    entreprise: "TechCorp Inc.",
    phone_number: "+33 6 34 56 78 90",
    role: "staff"
  }
];

const depots = [
  {
    name: "Dépôt Principal",
    location: "Paris",
    description: "Dépôt central",
    capacity: { total: 1000, used: 750 },
    company: "TechCorp Inc.",
    status: "active",
    address: "123 Rue de Paris, 75015 Paris"
  },
  {
    name: "Entrepôt Nord",
    location: "Lille",
    description: "Stockage lourd",
    capacity: { total: 500, used: 450 },
    company: "TechCorp Inc.",
    status: "active",
    address: "456 Avenue du Nord, 59000 Lille"
  }
];

const stockItems = [
  {
    name: "Ciment Sac 25kg",
    category: "Matériaux",
    quantity: 150,
    unit: "sac",
    company: "TechCorp Inc.",
    minQuantity: 20,
    price: 8.50
  },
  {
    name: "Vis à bois",
    category: "Quincaillerie",
    quantity: 5000,
    unit: "pièce",
    company: "TechCorp Inc.",
    minQuantity: 1000,
    price: 0.15
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stock-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Depot.deleteMany({});
    await Stock.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Created ${createdUsers.length} users`);
    
    // Create depots and link to users
    const createdDepots = await Promise.all(
      depots.map(async (depot, index) => {
        const manager = createdUsers[index % createdUsers.length]._id;
        return Depot.create({ ...depot, manager });
      })
    );
    
    console.log(`Created ${createdDepots.length} depots`);
    
    // Create stock items and link to depots
    const createdStock = await Promise.all(
      stockItems.map(async (item, index) => {
        const depot = createdDepots[index % createdDepots.length]._id;
        return Stock.create({ ...item, depot });
      })
    );
    
    console.log(`Created ${createdStock.length} stock items`);
    
    // Update depot capacity based on stock
    for (const depot of createdDepots) {
      const stockInDepot = await Stock.find({ depot: depot._id });
      const totalUsed = stockInDepot.reduce((sum, item) => sum + item.quantity, 0);
      
      await Depot.findByIdAndUpdate(depot._id, {
        'capacity.used': totalUsed
      });
    }
    
    console.log('Database seeded successfully!');
    
    // Display sample login credentials
    console.log('\n=== SAMPLE LOGIN CREDENTIALS ===');
    console.log('Admin: john@techcorp.com / password123');
    console.log('Manager: sarah@techcorp.com / password123');
    console.log('Staff: pierre@techcorp.com / password123');
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();