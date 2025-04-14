document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cliente");
      const data = await response.json();
  
      const clienteDiv = document.getElementById("clienteInfo");
      clienteDiv.innerHTML = `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Endereço:</strong> ${data.endereco.rua}, ${data.endereco.numero}, ${data.endereco.cidade} - ${data.endereco.codigoPostal}</p>
        <p><strong>Mês:</strong> ${data.consumo[0].mes} ${data.consumo[0].ano}</p>
        <p><strong>kWh Consumido:</strong> ${data.consumo[0].kWhConsumido} kWh</p>
        <p><strong>Custo Total:</strong> €${data.consumo[0].custoTotal}</p>
        <p><strong>Leitura:</strong> ${data.consumo[0].dataLeitura}</p>
        <p><strong>Tipo de Tarifa:</strong> ${data.informacoesAdicionais.tipoTarifa}</p>
        <p><strong>Fornecedor:</strong> ${data.informacoesAdicionais.fornecedorEnergia}</p>
        <p><strong>Contrato Ativo:</strong> ${data.informacoesAdicionais.contratoAtivo ? "Sim" : "Não"}</p>
      `;
    } catch (error) {
      console.error("Erro ao carregar os dados do cliente:", error);
    }
  });
  