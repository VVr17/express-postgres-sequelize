const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'John',
        get() {
          const rawValue = this.getDataValue('firstName');
          return rawValue ? rawValue.toUpperCase() : null;
        }, // Getter - gets data from DB and changes it
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Doe',
        get() {
          const rawValue = this.getDataValue('lastName');
          return rawValue ? rawValue.toUpperCase() : null;
        }, // Getter - gets data from DB and changes it
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('password', `hashed(${value})`);
        }, // Changes data before saving it to DB
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
