// Obter a data de hoje e a data de ontem
const hoje = new Date();
const ontem = new Date(hoje);
ontem.setDate(hoje.getDate() - 1);

// Formatar a data de ontem para o formato YYYY-MM-DD
const ano = ontem.getFullYear();
const mes = String(ontem.getMonth() + 1).padStart(2, '0');
const dia = String(ontem.getDate()).padStart(2, '0');
const dataOntemFormatada = `${ano}-${mes}-${dia}`;

// Filtrar as vendas de ontem
const vendasDeOntem = items.filter(item => {
    // Supondo que a data da venda esteja no formato 'YYYY-MM-DD HH:mm:ss'
    const dataVenda = new Date(item.json.Data);
    const dataVendaFormatada = `${dataVenda.getFullYear()}-${String(dataVenda.getMonth() + 1).padStart(2, '0')}-${String(dataVenda.getDate()).padStart(2, '0')}`;
    return dataVendaFormatada === dataOntemFormatada;
});

// Calcular o total das vendas de ontem
let totalVendas = 0;
vendasDeOntem.forEach(item => {
    totalVendas += parseFloat(item.json.Valor);
});

// Criar o corpo do e-mail em HTML
let emailBody = `
<html>
<head>
<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
</style>
</head>
<body>
<h2>Relatório de Vendas - ${dataOntemFormatada}</h2>
<table>
  <tr>
    <th>Produto</th>
    <th>Valor</th>
    <th>Data</th>
  </tr>
`;

vendasDeOntem.forEach(item => {
    const dataVenda = new Date(item.json.Data);
    const dataVendaFormatada = `${dataVenda.getDate().toString().padStart(2, '0')}/${(dataVenda.getMonth() + 1).toString().padStart(2, '0')}/${dataVenda.getFullYear()}`;
    emailBody += `
    <tr>
      <td>${item.json.Produto}</td>
      <td>R$ ${parseFloat(item.json.Valor).toFixed(2)}</td>
      <td>${dataVendaFormatada}</td>
    </tr>
    `;
});

emailBody += `
</table>
<h3>Total das Vendas: R$ ${totalVendas.toFixed(2)}</h3>
</body>
</html>
`;

return [{
    json: {
        bodyHTML: emailBody
    }
}];
