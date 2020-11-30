const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name : '],
  },
  age: {
    type: Number,
    required: [true, 'Please enter your age : '],
  },
  dob: {
    type: String,
    required: [true, 'Please enter your Date of Birth : '],
  },
  designation: {
    type: String,
    required: [true, 'Please enter your Designation : '],
  },
  joiningDate: {
    type: String,
    required: [true, 'Please enter your Joining Date : '],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;
