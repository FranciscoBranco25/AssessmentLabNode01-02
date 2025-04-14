// Importa o módulo Express
const express = require('express');

// Cria uma aplicação Express
const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Define a porta onde o servidor irá escutar
const PORT = 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Aplicação "MeuApp" iniciada por Francisco está a correr em http://localhost:${PORT}`);
});

// Declara a variável minhas_notas
const minhas_notas = [20, 10, 15, 17];

// a. Método GET para devolver a lista completa de minhas_notas
app.get('/notas', (req, res) => {
    res.status(200).json(minhas_notas); // Retorna status 200
});

// b. Método GET para devolver a nota na posição especificada
app.get('/notas/:posicao', (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);
    if (posicao >= 0 && posicao < minhas_notas.length) {
        res.status(200).json({ nota: minhas_notas[posicao] }); // Retorna status 200
    } else {
        res.status(400).json({ erro: 'Nota não encontrada na posição especificada.' }); // Retorna status 400
    }
});

// c. Método POST para adicionar um valor ao vetor minhas_notas via body
app.post('/notas', (req, res) => {
    let { nota } = req.body;
    nota = parseInt(nota, 10); // Converte o valor para inteiro
    if (typeof nota === 'number' && !isNaN(nota) && nota >= 0) {
        minhas_notas.push(nota);
        res.status(200).json({ mensagem: 'Nota adicionada com sucesso!', minhas_notas }); // Retorna status 200
    } else {
        res.status(400).json({ erro: 'Nota inválida. Certifique-se de enviar um número maior ou igual a 0.' }); // Retorna status 400
    }
});

// d. Método POST para adicionar um valor ao vetor minhas_notas via parâmetro
app.post('/notas/:nota', (req, res) => {
    const nota = parseInt(req.params.nota, 10);
    if (typeof nota === 'number' && !isNaN(nota) && nota >= 0) {
        minhas_notas.push(nota);
        res.status(200).json({ mensagem: 'Nota adicionada com sucesso!', minhas_notas }); // Retorna status 200
    } else {
        res.status(400).json({ erro: 'Nota inválida. Certifique-se de enviar um número maior ou igual a 0.' }); // Retorna status 400
    }
});

// e. Método PATCH para atualizar a nota na posição especificada
app.patch('/notas/:posicao', (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);
    let { nota } = req.body;
    nota = parseInt(nota, 10); // Converte o valor para inteiro
    if (posicao >= 0 && posicao < minhas_notas.length) {
        if (typeof nota === 'number' && !isNaN(nota) && nota >= 0) {
            minhas_notas[posicao] = nota;
            res.status(200).json({ mensagem: 'Nota atualizada com sucesso!', minhas_notas }); // Retorna status 200
        } else {
            res.status(400).json({ erro: 'Nota inválida. Certifique-se de enviar um número maior ou igual a 0.' }); // Retorna status 400
        }
    } else {
        res.status(400).json({ erro: 'Posição inválida. Nenhuma nota encontrada na posição especificada.' }); // Retorna status 400
    }
});

// f. Método DELETE para remover a nota na posição especificada
app.delete('/notas/:posicao', (req, res) => {
    const posicao = parseInt(req.params.posicao, 10);
    if (posicao >= 0 && posicao < minhas_notas.length) {
        const notaRemovida = minhas_notas.splice(posicao, 1);
        res.status(200).json({ mensagem: 'Nota removida com sucesso!', notaRemovida, minhas_notas }); // Retorna status 200
    } else {
        res.status(400).json({ erro: 'Posição inválida. Nenhuma nota encontrada na posição especificada.' }); // Retorna status 400
    }
});

// g. Método DELETE para remover todas as notas
app.delete('/notas', (req, res) => {
    if (minhas_notas.length > 0) {
        minhas_notas.length = 0; // Limpa o vetor
        res.status(200).json({ mensagem: 'Todas as notas foram removidas com sucesso!', minhas_notas }); // Retorna status 200
    } else {
        res.status(400).json({ erro: 'Nenhuma nota encontrada para remover.' }); // Retorna status 400
    }
});