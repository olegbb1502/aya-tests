module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
        amount: DataTypes.INTEGER
    });

    Donation.associate = (models) => {
        Donation.belongsTo(models.Employee);
    };

    return Donation;
};