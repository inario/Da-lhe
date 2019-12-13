var express = require('express')
var route = express.Router()
var documentacaoCtr = require('../control/documentacaoCtr')

// rota para listar todos usando middleware
//route.get('/',documentacaoCtr.getdocumentacoes, documentacaoCtr.listar)
route.get('/',documentacaoCtr.getdocumentacoes, documentacaoCtr.listar)

//rota para listar por filtro
route.post('/', documentacaoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', documentacaoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', documentacaoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', documentacaoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', documentacaoCtr.edita)

//rota para deletar
route.get('/del/:id', documentacaoCtr.deleta)

module.exports = route;