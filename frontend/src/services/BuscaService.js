const BUSCA_BASE_URL = "http://localhost:8080/busca";

export async function buscarItens(filtros) {
    const params = new URLSearchParams();

    if(filtros.ativo !== null && filtros.ativo !== undefined){
        params.append('ativo', filtros.ativo);
    }
    
    if (filtros.nome && filtros.nome.trim()) {
        params.append('nome', filtros.nome.trim());
    }

    if (filtros.categorias?.length > 0) {
        filtros.categorias.forEach(cat => params.append('categorias', cat));
    }

    if (filtros.subCategorias?.length > 0) {
        filtros.subCategorias.forEach(sub => params.append('subCategorias', sub));
    }

    if (filtros.unidadeMedida) {
        params.append('unidadeMedida', filtros.unidadeMedida);
    }

    if (filtros.ordenarPor) {
        params.append('ordenarPor', filtros.ordenarPor);
        params.append('direcao', filtros.direcao || 'ASC');
    }

    if (filtros.dataInicio) {
        params.append('dataInicio', filtros.dataInicio);
    }
    if (filtros.dataFim) {
        params.append('dataFim', filtros.dataFim);
    }

    if (filtros.tipoMovimentacao) {
        params.append('tipoMovimentacao', filtros.tipoMovimentacao);
    }

    const response = await fetch(`${BUSCA_BASE_URL}/itens?${params}`);

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
    }

    return response.json();
}