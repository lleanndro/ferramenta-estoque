import { useState } from "react";
import MovimentacaoForm from "../components/MovimentacaoForm";
import { registrarMovimentacao } from "../services/MovimentacaoService";

function MovimentacaoPage(){
    const[message, setMessage] = useState("");
    async function handleRegistrarMovimentacao(form) {
        try{
            await registrarMovimentacao(form);
            setMessage("Movimentação registrada com sucesso!");
        }catch(e){
            setMessage("Erro no registro da movimentação.");
        }
    }
    return (
        <div>
            <MovimentacaoForm onCadastrar={handleRegistrarMovimentacao}/>
            <p>{message}</p>
        </div>
    );
}
export default MovimentacaoPage;
