const userModel = require('../ormModel/UserModel');

class User {

    constructor(name, nickname, pwd, created_at, updated_at){
        this.name = name;
        this.nickname = nickname;
        this.pwd = pwd;
        this.created_at = created_at || new Date().toISOString();
        this.updated_at = updated_at || new Date().toISOString();
        this.status = true;
    }
    
    
    async getUser(idUser){
        const user = await userModel.findById(idUser);
        return user;
    };

    async createUser(){
        const newUser  = {
            name: this.name,
            nickname: this.nickname,
            pwd: this.pwd,
            created_at: this.created_at,
            updated_at: this.updated_at,
            status: this.status
        };
        return new userModel(newUser).save();
    }
};

module.exports = User;
