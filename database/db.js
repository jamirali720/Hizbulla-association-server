const { default: mongoose } = require("mongoose");
const configs  = require("../configs");


const connectDB = async () => {
  try {
    await mongoose.connect(configs.databaseUrl, );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;