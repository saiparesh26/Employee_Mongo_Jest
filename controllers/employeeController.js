const Employee = require('../models/employeeModel');
const path = require('path');
const excel = require('exceljs');
const logger = require('../middleware/logger');

// Description      Get all employees
// URL              GET /employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (err) {
    logger.info(err);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
};

// Description      Get an employee by ID
// URL              GET /employees/:id
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      const error = {
        method: req.method,
        URL: req.originalUrl,
        error: 'Invalid Employee ID',
        id: req.params.id,
      };
      logger.info('Invalid Request', error);

      return res.status(400).json({
        success: false,
        msg: 'Bad Request. Wrong ID',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    logger.info('Invalid request', err);
    res.status(400).json({
      success: false,
      msg: 'Bad Request. Wrong ID',
    });
  }
};

// Description      Create an Employee
// URL              POST /employees
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    logger.info('Invalid request', err);
    res.status(400).json({
      success: false,
      msg: 'Bad request',
    });
  }
};

// Description      Update an employee
// URL              PUT /employees/:id
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      const error = {
        method: req.method,
        URL: req.originalUrl,
        error: 'Invalid Employee ID',
        id: req.params.id,
      };

      logger.info('Invalid Request', error);

      return res.status(400).json({
        success: false,
        msg: 'Wrong ID',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    logger.info('Invalid Request', err);
    res.status(400).json({
      success: false,
      msg: 'Bad request',
    });
  }
};

// Description      Delete employee by ID
// URL              DELETE /employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      const error = {
        method: req.method,
        URL: req.originalUrl,
        error: 'Invalid Employee ID',
        id: req.params.id,
      };

      logger.info('Invalid Request', error);

      return res.status(400).json({
        success: false,
        msg: 'Wrong ID',
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    logger.info('Invalid Request', err);
    res.status(400).json({
      success: false,
      msg: 'Bad request',
    });
  }
};

const saveEmployeesToFile = async (req, res) => {
  try {
    const employees = await Employee.find();

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Employees');

    // WorkSheet Headers
    worksheet.columns = [
      { header: 'Id', key: '_id', width: 30 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Date of Birth', key: 'dob', width: 10 },
      { header: 'Designation', key: 'designation', width: 30 },
      { header: 'Joining Date', key: 'joiningDate', width: 15 },
      { header: 'Created At', key: 'created_date', width: 15 },
    ];

    // Add data rows
    worksheet.addRows(employees);

    // Write to file
    workbook.xlsx
      .writeFile(path.join(__dirname, '..', 'file', 'employees.xls'))
      .then(() => console.log('File saved'));

    res.status(200).json({
      success: true,
      msg: 'Data Saved to File',
    });
  } catch (err) {
    logger.info(err);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  saveEmployeesToFile,
};
