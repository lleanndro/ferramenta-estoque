import {buscarPorNome} from "./itemService";
const BASE_URL = "http://localhost:8080/movimentacoes";

export async function registrarMovimentacao(form){
    const item = await buscarPorNome(form.nomeItem);

    const movimentacao = {
        itemId: item.id,
        tipoMovimentacao: form.tipoMovimentacao,
        quantidade: parseFloat(form.quantidade),
        precoTotal: form.precoTotal ? parseFloat(form.precoTotal) : null
    }

    const response = await fetch (BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(movimentacao)
    })

    if(!response.ok){
        const erro = await response.text();
        throw new Error(erro);
    }
    return response.json();
}

