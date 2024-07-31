const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescriptions', {
    prescription_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_prescribed: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'prescriptions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prescription_id" },
        ]
      },
    ]
  });
};
