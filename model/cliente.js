const conexao = require('./conexao')

var cliente = conexao.Schema({
    nome:{
        type:String
    },
    endereco:{
        type:String
    },
    datanasc:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("cliente",cliente)