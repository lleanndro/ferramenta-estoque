import { useState } from "react";
import { cadastroECompra } from "../services/itemService";
import CadastroECompraForm from "../components/CadastroECompraForm";
function CadastroECompraPage() {
    const [message, setMessage] = useState("");
    async function handleCadastroECompra(form) {
        try {
            await cadastroECompra(form);
            setMessage("O cadastro e a compra do item foram registrados com sucesso!");
        }catch(e){
            setMessage("Erro no cadastro e registro da compra do item.")
        }
    }
    return(
        <div>
            <CadastroECompraForm onCadastrar= {handleCadastroECompra}/>
            <p>{message}</p>
        </div>
    );
}
export default CadastroECompraPage;