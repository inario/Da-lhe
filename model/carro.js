const conexao = require('./conexao')

var carro = conexao.Schema({
    modelo:{
        type:String
    },
    nacionalidade:{
        type:String
    },
    kmsrodados:{
        type:String
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("carro",carro)