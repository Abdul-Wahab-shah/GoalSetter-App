const mongoose = require('mongoose');
const URL='mongodb+srv://mernstack:Pakistan55@cluster0.og4vraf.mongodb.net/mernapp?retryWrites=true&w=majority'


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      // Additional options if needed...
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
