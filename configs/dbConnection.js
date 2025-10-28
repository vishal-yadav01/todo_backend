const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://ydev2897_db_user:haxBgGsPjRtbrblD@cluster0.tshjmmu.mongodb.net/?appName=Cluster0'
    );

    console.log('Db Connected Succefully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
