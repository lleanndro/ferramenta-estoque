import { useState } from "react";
import ItemForm from "../components/ItemForm";
import { cadastrarItem } from "../services/itemService";

function CadastroPage() {
    const [message, setMessage] = useState("");
    async function handleCadastrar(form) {
        try {
            await cadastrarItem(form);
            setMessage("Item cadastrado com sucesso!");
        } catch (e) {
            setMessage("Erro ao cadastar item.");
        }
    }
    return (
        <div>
            <ItemForm onCadastar={handleCadastrar} />
            <p>{message}</p>
        </div>

    );

}
export default CadastroPage;