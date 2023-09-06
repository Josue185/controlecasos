const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000; // ou qualquer porta de sua escolha

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '04101991',
  database: 'controle'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    throw err;
  }
  console.log('Conectado ao MySQL');
});

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post('/enviar-dados', (req, res) => {
  const dadosDoFormulario = req.body;

  // Insira os dados no banco de dados MySQL
  const sql = 'INSERT INTO casos (LDAP, dataAtendimento, numeroCaso, statusAtual, statusAtualizado, screenshot, time) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    dadosDoFormulario.LDAP,
    dadosDoFormulario.dataAtendimento,
    dadosDoFormulario.numeroCaso,
    dadosDoFormulario.statusAtual,
    dadosDoFormulario.statusAtualizado,
    dadosDoFormulario.screenshot,
    dadosDoFormulario.time
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no MySQL:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    console.log('Dados inseridos com sucesso no MySQL');
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
