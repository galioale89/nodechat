const mongoose = require('mongoose')


const Message = new mongoose.Schema({
    idSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    idRciv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    text: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }
});

const MessageModel = mongoose.model('message', Message);

module.exports = MessageModel;