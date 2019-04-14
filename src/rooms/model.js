export default (sequelize, DataType) =>{
  const Room = sequelize.define(
    'rooms', {
      id:{
        type: DataType.STRING,
        primaryKey: true
      },
      capacity:{
        type:DataType.INTEGER,
        allowNull: false
      }
  });
  return Room;
};