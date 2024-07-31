const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient_records', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    symptoms: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    results: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    examination_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    medical_records_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prescription_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'prescriptions',
        key: 'prescription_id'
      }
    }
  }, {
    sequelize,
    tableName: 'patient_records',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "patient_record_id",
        using: "BTREE",
        fields: [
          { name: "medical_records_id" },
        ]
      },
      {
        name: "invoice_id",
        using: "BTREE",
        fields: [
          { name: "bill_id" },
        ]
      },
      {
        name: "prescription_id",
        using: "BTREE",
        fields: [
          { name: "prescription_id" },
        ]
      },
    ]
  });
};
