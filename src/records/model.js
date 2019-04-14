export default (sequelize, DataType) => {
  const Record = sequelize.define(
    'Records', {
      id:{
        type: DataType.STRING,
        primaryKey: true  
      },
      patientId:{
        type: DataType.STRING,
        allowNull: false
      },
      description:{
        type: DataType.STRING,
        allowNull: false
      }
    });
  return Record;
};