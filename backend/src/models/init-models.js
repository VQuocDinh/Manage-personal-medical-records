var DataTypes = require("sequelize").DataTypes;
var _accounts = require("./accounts");
var _bill = require("./bill");
var _bill_detail = require("./bill_detail");
var _costs = require("./costs");
var _health_indicators = require("./health_indicators");
var _medical_records = require("./medical_records");
var _medications = require("./medications");
var _patient_records = require("./patient_records");
var _patients = require("./patients");
var _prescription_details = require("./prescription_details");
var _prescriptions = require("./prescriptions");
var _record_indicators = require("./record_indicators");
var _roles = require("./roles");
var _staff = require("./staff");
var _staff_indicators = require("./staff_indicators");

function initModels(sequelize) {
  var accounts = _accounts(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var bill_detail = _bill_detail(sequelize, DataTypes);
  var costs = _costs(sequelize, DataTypes);
  var health_indicators = _health_indicators(sequelize, DataTypes);
  var medical_records = _medical_records(sequelize, DataTypes);
  var medications = _medications(sequelize, DataTypes);
  var patient_records = _patient_records(sequelize, DataTypes);
  var patients = _patients(sequelize, DataTypes);
  var prescription_details = _prescription_details(sequelize, DataTypes);
  var prescriptions = _prescriptions(sequelize, DataTypes);
  var record_indicators = _record_indicators(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var staff_indicators = _staff_indicators(sequelize, DataTypes);

  bill.belongsToMany(costs, { as: 'cost_id_costs', through: bill_detail, foreignKey: "bill_id", otherKey: "cost_id" });
  costs.belongsToMany(bill, { as: 'bill_id_bills', through: bill_detail, foreignKey: "cost_id", otherKey: "bill_id" });
  health_indicators.belongsToMany(medical_records, { as: 'record_id_medical_records', through: record_indicators, foreignKey: "indicator_id", otherKey: "record_id" });
  health_indicators.belongsToMany(staff, { as: 'staff_id_staffs', through: staff_indicators, foreignKey: "indicator_id", otherKey: "staff_id" });
  medical_records.belongsToMany(health_indicators, { as: 'indicator_id_health_indicators', through: record_indicators, foreignKey: "record_id", otherKey: "indicator_id" });
  medications.belongsToMany(prescriptions, { as: 'prescription_id_prescriptions', through: prescription_details, foreignKey: "medication_id", otherKey: "prescription_id" });
  prescriptions.belongsToMany(medications, { as: 'medication_id_medications', through: prescription_details, foreignKey: "prescription_id", otherKey: "medication_id" });
  staff.belongsToMany(health_indicators, { as: 'indicator_id_health_indicators_staff_indicators', through: staff_indicators, foreignKey: "staff_id", otherKey: "indicator_id" });
  bill_detail.belongsTo(bill, { as: "bill", foreignKey: "bill_id"});
  bill.hasMany(bill_detail, { as: "bill_details", foreignKey: "bill_id"});
  bill_detail.belongsTo(costs, { as: "cost", foreignKey: "cost_id"});
  costs.hasMany(bill_detail, { as: "bill_details", foreignKey: "cost_id"});
  record_indicators.belongsTo(health_indicators, { as: "indicator", foreignKey: "indicator_id"});
  health_indicators.hasMany(record_indicators, { as: "record_indicators", foreignKey: "indicator_id"});
  staff_indicators.belongsTo(health_indicators, { as: "indicator", foreignKey: "indicator_id"});
  health_indicators.hasMany(staff_indicators, { as: "staff_indicators", foreignKey: "indicator_id"});
  record_indicators.belongsTo(medical_records, { as: "record", foreignKey: "record_id"});
  medical_records.hasMany(record_indicators, { as: "record_indicators", foreignKey: "record_id"});
  prescription_details.belongsTo(medications, { as: "medication", foreignKey: "medication_id"});
  medications.hasMany(prescription_details, { as: "prescription_details", foreignKey: "medication_id"});
  medical_records.belongsTo(patients, { as: "patient", foreignKey: "patient_id"});
  patients.hasMany(medical_records, { as: "medical_records", foreignKey: "patient_id"});
  patient_records.belongsTo(prescriptions, { as: "prescription", foreignKey: "prescription_id"});
  prescriptions.hasMany(patient_records, { as: "patient_records", foreignKey: "prescription_id"});
  prescription_details.belongsTo(prescriptions, { as: "prescription", foreignKey: "prescription_id"});
  prescriptions.hasMany(prescription_details, { as: "prescription_details", foreignKey: "prescription_id"});
  staff_indicators.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(staff_indicators, { as: "staff_indicators", foreignKey: "staff_id"});

  return {
    accounts,
    bill,
    bill_detail,
    costs,
    health_indicators,
    medical_records,
    medications,
    patient_records,
    patients,
    prescription_details,
    prescriptions,
    record_indicators,
    roles,
    staff,
    staff_indicators,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
