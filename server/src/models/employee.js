module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        name: DataTypes.STRING,
        department: DataTypes.STRING
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Donation);
    };

    return Employee;
};