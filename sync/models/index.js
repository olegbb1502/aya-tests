const sequelize = require('../db/connection');

// Define models
const DepartmentModel = require('./department');
const EmployeeModel = require('./employee');
const SalaryModel = require('./salary');
const DonateModel = require('./donate');
const RateModel = require('./rate');

// Define associations between models
EmployeeModel.belongsTo(DepartmentModel, { foreignKey: 'department_id' });
DepartmentModel.hasMany(EmployeeModel, { foreignKey: 'department_id' });
SalaryModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id' });
DonateModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id' });
EmployeeModel.hasMany(SalaryModel, { foreignKey: 'employee_id' });
EmployeeModel.hasMany(DonateModel, { foreignKey: 'employee_id' });

// Sync models with database
sequelize.sync();

// Export Sequelize instance and models
module.exports = {
  sequelize,
  Department: DepartmentModel,
  Employee: EmployeeModel,
  Salary: SalaryModel,
  Donate: DonateModel,
  Rate: RateModel,
};
