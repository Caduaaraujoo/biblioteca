const express = require('express');
const { todosOslivros, consultarLivroId, addLivro, subtistuirLivro, atualizarLivro, deletarLivro } = require("./controladores/livros");

const rotas = express();

rotas.get('/livros', todosOslivros);
rotas.get('/livros/:id', consultarLivroId);
rotas.post('/livros', addLivro);
rotas.put('/livros/:id', subtistuirLivro);
rotas.patch('/livros/:id', atualizarLivro);
rotas.delete('/livros/:id', deletarLivro );






module.exports = rotas