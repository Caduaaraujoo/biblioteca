const { json } = require('express');
let { livros }  = require('../dados/biblioteca');


const todosOslivros = (req, res) => {
    return res.status(200).json(livros)
}

const consultarLivroId = (req, res) => {
    const { id } = req.params

    const livrosId = livros.find((livro) => {
      return livro.id === Number(id);
    })
    
    if(!Number(id)){
       return res.status(400).json({
            menssagem: 'O valor do parâmetro ID da URL não é um número válido.'
        })
    }

    if(!livrosId){
        return res.status(404).json({
            mensagem: 'Não existe livro para o ID informado.'
        })
    }

    return res.status(200).json(livrosId)

}

const addLivro = (req, res) => {
    const {titulo, autor, ano, numPaginas} = req.body;

    const arrayIndice = [];

    for(const livro of livros){
       
       arrayIndice.push(livro.id);
    }
    const maiorIndice = Math.max(...arrayIndice);
   

    const novoLivro = {
        id: maiorIndice+1,
        titulo,
        autor,
        ano,
        numPaginas
    }
    livros.push(novoLivro)
    return res.status(200).json(novoLivro)
}

const subtistuirLivro = (req, res) => {
    const { id } = req.params;
    const {titulo, autor, ano, numPaginas} = req.body

    if(!Number(id)){
        return res.status(400).json({
            mensagem: 'O valor do parâmetro ID da URL não é um número válido.'
        })
    }


    if(!titulo || !autor || !ano || !numPaginas){
        return res.status(400).json({
            mensagem: 'Os campus de "titulo, autor, ano, numPaginas" são obrigatórios'
        })
    }

    const substituir = livros.find((livro) => {
        return livro.id === Number(id)
    })

    if(!substituir){
        return res.status(400).json({
            mensagem: 'Não existe livro para o ID informado.'
        })
    }

    substituir.titulo = titulo;
    substituir.autor = autor;
    substituir.ano = ano;
    substituir.numPaginas = numPaginas;

    return res.status(200).json({
        mensagem: 'Livro substituído.'
    });
}

const atualizarLivro = (req, res) => {
    const { id } = req.params;
    const {titulo, autor, ano, numPaginas} = req.body;

    if(!Number(id)){
        return res.status(400).json({
            mensagem: 'O valor do parâmetro ID da URL não é um número válido.'
        })
    }

    const atualizar = livros.find((livro) => {
        return livro.id === Number(id);
    })

    if(!atualizar){
        return res.status(400).json({
            mensagem:'Não existe livro a ser alterado para o ID informado.'
        })
    }

    if(titulo || autor || ano || numPaginas){
        atualizar.titulo = titulo;
        atualizar.autor = autor;
        atualizar.ano = ano;
        atualizar.numPaginas = numPaginas
    }

    return res.status(200).json({
        mensagem:'livro alterado'
    })
}

const deletarLivro = (req, res) => {
    const { id } = req.params

    if(!Number(id)){
        return res.status(400).json({
            mensagem: 'O valor do parâmetro ID da URL não é um número válido.'
        })
    }

    const excluirLivro = livros.find((livro) => {
        return livro.id === Number(id);
    })

    if (!excluirLivro){
       res.status(400).json({
           mensagem: 'Não existe livro a ser removido para o ID informado.'
       }); 
    }

    livros = livros.filter((livro) => {
        return livro.id !== Number(id);
    })

    return res.status(200).json({
        mensagem: 'Livro removido.'
    })


   
}

module.exports = {
    todosOslivros,
    consultarLivroId,
    addLivro,
    subtistuirLivro,
    atualizarLivro,
    deletarLivro
}