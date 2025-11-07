const total = items.length;
const data = new Date().toLocaleString("pt-BR");
return [{
    json: {
        mensagem: `✅ ${total} registros processados em ${data} - rotina de madrugada concluída!`
    }
}];