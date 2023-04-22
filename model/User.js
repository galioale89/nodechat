const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status:{
        type: Boolean
    }
});

User.pre('save', 
    async () => {
        const user = this;
        const hash = bcrypt.hash(this.senha, 10);
        this.senha = hash;
    }
);

User.methods.isValidPassword = async (password) => {
    const user = this;
    const compare = await bcrypt.compare(password, user.senha);
    return compare;
};

const UserModel = mongoose.model('user', User)

module.exports = UserModel;