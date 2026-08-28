const mongoose = require("mongoose");
let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not configured");
  }

  connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      bufferCommands: false,
    }).then(() => {
      console.log("✅ MongoDB Connected");
      return mongoose.connection;
    }).catch((error) => {
      console.error("❌ MongoDB Connection Failed");
      console.error(error.message);
      connectionPromise = undefined;
      throw new Error("Database unavailable. Check MONGO_URI and MongoDB network access.");
    });

  return connectionPromise;
};

const requireDatabase = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = connectDB;
module.exports.requireDatabase = requireDatabase;