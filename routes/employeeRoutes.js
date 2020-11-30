const { Router } = require('express');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  saveEmployeesToFile,
} = require('../controllers/employeeController');

const router = Router();

router.route('/').get(getEmployees).post(createEmployee);

router.route('/save').get(saveEmployeesToFile);

router
  .route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
