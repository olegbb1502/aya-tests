const { 
    Department,
    Employee,
    Salary,
    Donate 
} = require('../../models');
const { sequelize } = require('../../models/index'); // Assuming Sequelize instance is exported

const employeeSync = async (data) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const [department] = await Department.findOrCreate({
      where: { id: data.department.id },
      defaults: { name: data.department.name },
      transaction
    });

    const [employee] = await Employee.findOrCreate({
      where: { id: data.id },
      defaults: {
        name: data.name,
        surname: data.surname,
        department_id: department.id
      },
      transaction
    });

    await Promise.all(data.salaries.map(async (salaryData) => {
      await Salary.findOrCreate({
        where: { id: salaryData.id },
        defaults: {
            employee_id: employee.id,
            amount: salaryData.amount,
            date: new Date(salaryData.date)
        },
        transaction
      });
    }));

    if (data.donations) {
        await Promise.all(data.donations.map(async donateData => {
            await Donate.findOrCreate({
                where: { id: donateData.id },
                defaults: {
                    employee_id: employee.id,
                    amount: donateData.amount,
                    date: new Date(donateData.date)
                },
                transaction
            });
        }));
    }
    await transaction.commit();

    console.log(`Employee: ${employee.id} Data inserted successfully!`);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error inserting data:', error);
  }
}

module.exports = {
  employeeSync
}
