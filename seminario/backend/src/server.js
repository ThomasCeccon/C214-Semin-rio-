const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data', 'mockBD.json');

const loadData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    return [];
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
  }
};

app.get('/api/quote-requests', (req, res) => {
  const quoteRequests = loadData();
  res.json(quoteRequests);
});

app.post('/api/quote-requests', (req, res) => {
  const newRequest = req.body;

  if (!newRequest.name || !newRequest.email || !newRequest.phone || !newRequest.service) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const quoteRequests = loadData();
  quoteRequests.push(newRequest);

  saveData(quoteRequests);
  
  res.status(201).json({ message: 'Solicitação de orçamento criada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta: ${port}`);
});
