const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patients', {
    patient_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cccd: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "Male"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'patients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
