var documentacao = require('../model/documentacao')

//middleware para buscar documentacoes
function getdocumentacoes(req,res,next){
    documentacao.find({}).lean().exec(function(err,docs){
        req.documentacoes = docs
        next()
    })
}

function listar(req,res){
    documentacao.find({}).lean().exec(function(err,docs){
        res.render('documentacao/list.ejs',{"documentacoes" : docs})
    })
}

function filtrar(req,res){
    documentacao.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('documentacao/list.ejs',{"documentacoes" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("documentacao/add.ejs")
}

function adiciona(req,res){
    var novodocumentacao = new documentacao({
        nome: req.body.nome
    })
    novodocumentacao.save(function(err){
        if(err){
            documentacao.find({}).lean().exec(function(err,docs){
                res.render('documentacao/list.ejs', { msg: "Problema ao salvar!", documentacoes: docs })
            })            
        }else{
            documentacao.find({}).lean().exec(function(err,docs){
                res.render('documentacao/list.ejs', { msg: "Adicionado com sucesso!", documentacoes: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    documentacao.findById(req.params.id,function(err,documentacao){
        res.render('documentacao/edit.ejs',{'documentacao':documentacao});
    })    
}

function edita(req,res){
    documentacao.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            documentacao.find({}).lean().exec(function(err,docs){
                res.render('documentacao/list.ejs', { msg: "Problema ao editar!", documentacoes: docs })
            })            
        }else{
            documentacao.find({}).lean().exec(function(err,docs){
                res.render('documentacao/list.ejs', { msg: "Editado com sucesso!", documentacoes: docs })
            })   
        }
    })
}

function deleta(req,res){
    documentacao.findByIdAndDelete(req.params.id,function(){
        documentacao.find({}).lean().exec(function(err,docs){
            res.render('documentacao/list.ejs', { msg: "Removido com sucesso!", documentacoes: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getdocumentacoes
}