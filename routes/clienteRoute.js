var express = require('express')
var route = express.Router()
var clienteCtr = require('../control/clienteCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',clienteCtr.getclientes, clienteCtr.listar)

//rota para listar todos
route.get('/', clienteCtr.listar)

//rota para listar por filtro
route.post('/', clienteCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', clienteCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), clienteCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', clienteCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), clienteCtr.edita)

//rota para deletar
route.get('/del/:id', clienteCtr.deleta)

module.exports = route;