const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define(
    'User',
    {
      // id: {
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4,
      //   primaryKey: true,
      // },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'John',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Doe',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      freezeTableName: true, // Freezes table name as it is defined
      // tableName: "Employees" - Sets table name
    }
  );

  sequelize.sync({ alter: true }); // Creates a table if it doesn't exist and adds what was changed
  // sequelize.sync({ force: true, match: /_test$/ }); // Drops DB and recreates again, only for DB matches "_test"
};
