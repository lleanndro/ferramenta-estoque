import { useEffect, useState } from "react";
import ItemTabela from "../components/ItemTabela";
import {listarTodosOsItens, deletarItem} from "../services/itemService";


function ItensPage(){
    const [itens,setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro]  = useState(null);

    async function carregarItens(){
        try{
            setCarregando(true);
            const itensDados = await listarTodosOsItens();
            setItens(itensDados);
        }catch(e){
            setErro("Erro ao carregar itens, tente novamente");
        }finally{
            setCarregando(false);
        }
    }   

    async function handlerDeletar(id) {
        await deletarItem(id);
        carregarItens();
    }

    useEffect(()=>{
        carregarItens()
    }, []);

    if(carregando){
        return <p>Carregando itens..</p>;
    }
    if(erro){
        return <p>{erro}</p>;
    }

    return(
        <div>
            <h1>Itens cadastrados</h1>
            <ItemTabela itens={itens} onDeletar={handlerDeletar}/>
        </div>
    )
}

export default ItensPage;