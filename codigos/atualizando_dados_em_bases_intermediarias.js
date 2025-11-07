return items.map(item => {
    let notaTxt = (item.json.Nota || "").toString().toLowerCase().trim();
    let notaNum = null;

    // Mapeia palavras para números
    switch (notaTxt) {
        case "um": notaNum = 1; break;
        case "dois": notaNum = 2; break;
        case "três":
        case "tres": notaNum = 3; break;
        case "quatro": notaNum = 4; break;
        case "cinco": notaNum = 5; break;
        default:
            // Se já veio número, converte
            notaNum = Number(notaTxt) || 0;
    }

    // Retorna os dados tratados
    return {
        cliente: item.json.cliente,
        produto: item.json.produto,
        nota: notaNum,
        comentario: item.json.comentario || "Sem comentário"
    };
});
