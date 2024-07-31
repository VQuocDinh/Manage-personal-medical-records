const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staff_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_joined: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staff_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
