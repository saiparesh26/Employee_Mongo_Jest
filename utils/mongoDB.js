const mongoose = require('mongoose');
const connectDB = require('../config/db');

module.exports = {
  mongoose,
  connect: () => {
    connectDB();
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
