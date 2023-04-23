const mongoose = require('mongoose');
const config = require('./config.json');
const dbData = config.DB_SERVER;

class DataBase {
    constructor() {}

    async connect(){
        mongoose.connect(`mongodb://${dbData.DB_USER}:${dbData.DB_PWD}@${dbData.DB_HOST}:${dbData.DB_PORT}/${dbData.DB_NAME}?directConnection=true&authMechanism=DEFAULT&authSource=${dbData.DB_NAME}}`, {
            useNewParser: true,
            useUnifiedTopography: true
        }).then(() => {
            console.log(`${dbData.DB_NAME} conected successfully!`)
        }).catch((err) => {
            console.log(`Error: ${err}`)
        });
    }
}


module.exports = new DataBase();