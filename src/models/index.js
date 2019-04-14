import Sequelize from 'sequelize';
import connection from '../db/sequelize';

const models = {
    Patients: connection.import('../patients/model'),
    Rooms: connection.import('../rooms/model'),
    Employees: connection.import('../employees/model'),
    Records: connection.import('../records/model'),
    Medicaments: connection.import('../medicaments/model')
}
Object.keys(models).forEach((modelName) =>{
    if('associate' in models[modelName]){
        models[modelName].associate(models);
    }
});

models.Patients.belongsTo(models.Rooms);
models.Rooms.hasMany(models.Patients);

models.Records.belongsTo(models.Patients);
models.Patients.hasMany(models.Records);

models.Patients.belongsTo(models.Employees);
models.Employees.hasMany(models.Patients);

models.Records.hasMany(models.Medicaments);

models.connection = connection;
models.Sequelize = Sequelize;

export default models;

/*
const room = models.Rooms.findOne({
    include:[
        {
            model: models.Patients,
            as:'patients'
        }
    ]
});

*/