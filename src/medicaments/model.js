export default (sequelize, DataType) =>{
  const Medicament = sequelize.define(
    'Medicaments', {
      id:{
        type: DataType.STRING,
        primaryKey: true
      },
      code:{
        type: DataType.STRING,
        allowNull: false
      },
      price:{
        type:DataType.INTEGER,
        allowNull: false
      }
    });
    return Medicament;
};