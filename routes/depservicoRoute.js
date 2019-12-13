var express = require('express')
var route = express.Router()
var depservicoCtr = require('../control/depservicoCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',depservicoCtr.getdepsservico, depservicoCtr.listar)
route.get('/',depservicoCtr.getdepsservico, depservicoCtr.listar)

//rota para listar por filtro
route.post('/', depservicoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', depservicoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), depservicoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', depservicoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), depservicoCtr.edita)

//rota para deletar
route.get('/del/:id', depservicoCtr.deleta)

module.exports = route;