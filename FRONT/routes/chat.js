var express = require('express');
var router = express.Router();
const dados = require('../dados.json')
const listaPessoas = dados.listaPessoas;
/*GET chat page*/
router.get('/', (req, res, next) => {
    res.render('chat', {listaPessoas: listaPessoas});
});

module.exports = router;