const mongoose = require('mongoose'); 


const connectDB = async () => {
  try {
    await mongoose.connect( process.env.MONGOLAB_URI , {   //MONGOLAB_URI is heroku config var and MONGODBURI_LOCAL is a local environment var
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