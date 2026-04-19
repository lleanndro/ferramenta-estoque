const BUSCA_BASE_URL = "http://localhost:8080/busca";

export async function buscarItens(filtros) {
    const params = new URLSearchParams();
    
    if (filtros.categorias?.length) {
        filtros.categorias.forEach(c => params.append('categorias', c));
    }
    if (filtros.ordenarPor) params.append('ordenarPor', filtros.ordenarPor);
    if (filtros.direcao) params.append('direcao', filtros.direcao);
    if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros.dataFim) params.append('dataFim', filtros.dataFim);
    if (filtros.tipoMovimentacao) params.append('tipoMovimentacao', filtros.tipoMovimentacao);
    
    const response = await fetch(`${BUSCA_BASE_URL}/itens?${params}`);
    
    if (!response.ok){
        const erro = await response.text()
        throw new Error(erro);
    }
    return response.json();
}