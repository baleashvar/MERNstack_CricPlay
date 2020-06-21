const mongoose = require('mongoose'); 

const connectDB = async () => {
  try {
    await mongoose.connect( MONGOLAB_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected');
  } catch (err) {
    console.log(err.toString());
  }
};

module.exports = connectDB;