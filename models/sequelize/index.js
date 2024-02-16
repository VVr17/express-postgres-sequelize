const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'John',
        validate: {
          len: [2, 10],
        },
        get() {
          const rawValue = this.getDataValue('firstName');
          return rawValue ? rawValue.toUpperCase() : null;
        }, // Getter - gets data from DB and changes it
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Doe',
        validate: {
          len: [2, 10],
        },
        get() {
          const rawValue = this.getDataValue('lastName');
          return rawValue ? rawValue.toUpperCase() : null;
        }, // Getter - gets data from DB and changes it
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: { msg: 'Email is required' },
        },
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
      paranoid: true, // Enable soft-deletion with "deletedAt" column and possibility to restore data
    }
  );

  const ContactInfo = sequelize.define(
    'ContactInfo',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  const Tweet = sequelize.define(
    'Tweet',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 1000],
        },
      },
    },
    {
      timestamps: true,
    }
  );

  //hasOne, belognsTo, hasMany, belongsToMany

  // One-to-one association => hasOne, belognsTo
  User.hasOne(ContactInfo, {
    foreignKey: {
      type: DataTypes.UUID,
      name: 'UserUuid',
      allowNull: false,
    },
  });
  ContactInfo.belongsTo(User);

  // One-to-many association => hasMany, belognsTo
  User.hasMany(Tweet, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  Tweet.belongsTo(User);

  // Many-to-many association => belongsToMany
  User.belongsToMany(User, {
    as: 'User',
    foreignKey: 'UserUuid',
    through: 'Follow',
  });
  User.belongsToMany(User, {
    as: 'Followed',
    foreignKey: 'FollowedId',
    through: 'Follow',
  });

  sequelize.sync({ alter: true }); // Creates a table if it doesn't exist and adds what was changed
  // sequelize.sync({ force: true, match: /_test$/ }); // Drops DB and recreates again, only for DB matches "_test"
};
