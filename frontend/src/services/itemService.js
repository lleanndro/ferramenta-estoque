const BASE_URL = "http://localhost:8080/itens";
/// item => item já veio totalmente formado do frontend;
/// form -> veio um form que precisa ser "limpado" ou melhorado para ser usado.
export async function listarTodosOsItens() {
    const response = await fetch(BASE_URL);
    return response.json();
}

export async function cadastrarItem(item) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
    }
    return response.json();
}

export async function deletarItem(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
    }
    return response;
}

export async function buscarPorNome(nome) {
    const response = await fetch(`${BASE_URL}/buscar/${nome}`);
    return response.json();
}

export async function cadastroECompra(form) {
    const cadastroECompra = {
        nome: form.nome,
        categoria: form.categoria,
        subCategoria: form.subCategoria,
        unidadeMedida: form.unidadeMedida,
        quantidade: parseFloat(form.quantidade),
        precoTotal: form.precoTotal ? parseFloat(form.precoTotal) : null
    }
    const response = await fetch(`${BASE_URL}/cadastro-compra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastroECompra)
    });
    if (!response.ok) {
        const erro = await response.text()
        throw new Error(erro);
    }
    return response.json();
}