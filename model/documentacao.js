const conexao = require('./conexao')

var documentacao = conexao.Schema({
    crv:{
        type:String
    },
    certipva:
        {
          type:String
        }
    
})

module.exports = conexao.model("documentacao",documentacao)