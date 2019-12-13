var depservico = require('../model/depservico')
var editora = require('../model/editora')
var genero = require('../model/genero')
var autor = require('../model/autor')

//middleware para buscar depsservicos
function getdepsservicos(req, res, next) {
    depservico.find({}).lean().exec(function (err, docs) {
        req.depsservicos = docs
        next()
    })
}

function listar(req, res) {
    depservico
        .find({})
        .populate('genero')
        .populate('editora')
        .populate('autores')
        .lean()
        .exec(function (err, docs) {
            res.render('depservico/list.ejs', { "depsservicos": docs })
        })
}

function filtrar(req, res) {
    depservico
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('genero')
        .populate('editora')
        .populate('autores')
        .lean()
        .exec(function (err, docs) {
            res.render('depservico/list.ejs', { "depsservicos": docs })
        })
}

function abrirAdiciona(req, res) {
    editora
        .find({})
        .lean()
        .exec(function (e, editoras) {
            autor
                .find({})
                .lean()
                .exec(function (e, autores) {
                    genero
                        .find({})
                        .lean()
                        .exec(function (e, generos) {
                            res.render("depservico/add.ejs", { "Editoras": editoras, "Autores": autores, "Generos": generos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novodepservico = new depservico({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        genero: req.body.genero,
        editora: req.body.editora,
        autores: req.body.autores,
    })
    novodepservico.save(function (err) {
        if (err) {
            depservico.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('depservico/list.ejs', { msg: "Problema ao salvar!", depsservicos: docs })
            })
        } else {
            depservico.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('depservico/list.ejs', { msg: "Adicionado com sucesso!", depsservicos: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    editora.find({}).lean().exec(
        function (e, editoras) {
            autor.find({}).lean().exec(
                function (e, autores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            depservico.findOne({ _id: req.params.id }).populate('genero').populate('editora').populate('autores').exec(
                                function (err, depservico) {
                                    res.render('depservico/edit.ejs', { 'depservico': depservico, "Editoras": editoras, "Autores": autores, "Generos": generos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    depservico.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            genero: req.body.genero,
            editora: req.body.editora,
            autores: req.body.autores
        }, function (err) {
            if (err) {
                depservico.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                    res.render('depservico/list.ejs', { msg: "Problema ao editar!", depsservicos: docs })
                })
            } else {
                depservico.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                    res.render('depservico/list.ejs', { msg: "Editado com sucesso!", depsservicos: docs })
                })
            }
        })
}

function deleta(req, res) {
    depservico.findByIdAndDelete(req.params.id, function () {
        depservico.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
            res.render('depservico/list.ejs', { msg: "Removido com sucesso!", depsservicos: docs })
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
    getdepsservicos
}