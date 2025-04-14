const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());


const clienteData = {
  "clienteId": "12345",
  "nome": "João Silva",
  "endereco": {
    "rua": "Rua Exemplo",
    "numero": "42",
    "cidade": "Lisboa",
    "codigoPostal": "1234-567"
  },
  "consumo": [
    {
      "mes": "Janeiro",
      "ano": 2023,
      "kWhConsumido": 250,
      "custoTotal": 35.50,
      "dataLeitura": "2023-01-31"
    }
  ],
  "informacoesAdicionais": {
    "tipoTarifa": "Residencial",
    "fornecedorEnergia": "Empresa XYZ",
    "contratoAtivo": true
  }
};

app.get('/api/cliente', (req, res) => {
  res.json(clienteData);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
