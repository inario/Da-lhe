var carro = require('../model/carro')


//middleware para buscar carros
function getcarros(req, res, next) {
    carro.find({}).lean().exec(function (err, docs) {
        req.carros = docs
        next()
    })
}

function listar(req, res) {
    carro.find({}).lean().exec(function (err, docs) {
        res.render('carro/list.ejs', { "carros": docs })
    })
}

function filtrar(req, res) {
    carro.find({ modelo: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('carro/list.ejs', { "carros": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("carro/add.ejs")
}

function adiciona(req, res) {
    var novocarro = new carro({
        modelo: req.body.modelo,
        nacionalidade: req.body.nacionalidade,
        kmsrodados: req.body.kmsrodados,
        foto: req.file.filename
    })
    novocarro.save(function (err) {
        if (err) {
            carro.find({}).lean().exec(function (err, docs) {
                res.render('carro/list.ejs', { msg: "Problema ao salvar!", carros: docs })
            })
        } else {
            carro.find({}).lean().exec(function (err, docs) {
                res.render('carro/list.ejs', { msg: "Adicionado com sucesso!", carros: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    carro.findById(req.params.id, function (err, carro) {
        res.render('carro/edit.ejs', { 'carro': carro });
    })
}

function edita(req, res) {
    carro.findByIdAndUpdate(req.params.id,
        {
            modelo: req.body.modelo,
            nacionalidade: req.body.nacionalidade,
            kmsrodados: req.body.kmsrodados,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                carro.find({}).lean().exec(function (err, docs) {
                    res.render('carro/list.ejs', { msg: "Problema ao editar!", carros: docs })
                })
            } else {
                carro.find({}).lean().exec(function (err, docs) {
                    res.render('carro/list.ejs', { msg: "Editado com sucesso!", carros: docs })
                })
            }
        })
}

function deleta(req, res) {
    carro.findByIdAndDelete(req.params.id, function () {
        carro.find({}).lean().exec(function (err, docs) {
            res.render('carro/list.ejs', { msg: "Removido com sucesso!", carros: docs })
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
    getcarros
}