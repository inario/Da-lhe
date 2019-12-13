const conexao = require('./conexao')

var livro = conexao.Schema({
    nomedep:{
        type:String
    },
    consulta:{
        type:Date

    }, 
    foto:{
        type:String
    },

})

module.exports = conexao.model("livro",livro)