const BASE_URL = "http://localhost:8080/itens";

export async function listarTodosOsItens(){
    const response = await fetch(BASE_URL);
    return response.json();
}

export async function cadastrarItem(item) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(item)
    });

    if(!response.ok){
        const erro = await response.text();
        throw new Error(erro);
    }
    return response.json();
}

export async function deletarItem(id){
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if(!response.ok){
        const erro = await response.text();
        throw new Error(erro);
    }
    return response;
}

export async function buscarPorNome(nome){
    const response = await fetch (`${BASE_URL}/buscar/${nome}`);
    return response.json();
}