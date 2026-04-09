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
    return response.json();
}

export async function deletarItem(id){
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return response;
}