import { useEffect, useState } from "react";
import EstoqueTabela from "../components/EstoqueTabela";
import FiltroPanel from "../components/FiltroPanel";
import { listarItensNoEstoque, deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";

function EstoquePage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [modoFiltrado, setModoFiltrado] = useState(false);

    // Carrega estoque "cru" (sem filtros)
    async function carregarEstoque() {
        try {
            setCarregando(true);
            setErro(null);
            const itensDados = await listarItensNoEstoque();
            setItens(itensDados);
            setModoFiltrado(false);
        } catch (e) {
            setErro("Erro ao carregar itens, tente novamente");
        } finally {
            setCarregando(false);
        }
    }

    // Aplica filtros
    async function handleFiltrar(filtros) {
        try {
            setCarregando(true);
            setErro(null);
            
            // Converte datas para formato ISO se preenchidas
            const filtrosFormatados = {
                ...filtros,
                dataInicio: filtros.dataInicio ? `${filtros.dataInicio}:00` : null,
                dataFim: filtros.dataFim ? `${filtros.dataFim}:00` : null
            };
            
            const itensFiltrados = await buscarItens(filtrosFormatados);
            setItens(itensFiltrados);
            setModoFiltrado(true);
        } catch (e) {
            setErro("Erro ao aplicar filtros: " + e.message);
        } finally {
            setCarregando(false);
        }
    }

    function handleLimpar() {
        carregarEstoque();
    }

    async function handlerDeletar(id) {
        try {
            await deletarItem(id);
            // Recarrega no modo atual (filtrado ou cru)
            if (modoFiltrado) {
                // Se estiver filtrado, seria ideal reaplicar os filtros
                // Por simplicidade, voltamos ao modo cru
                carregarEstoque();
            } else {
                carregarEstoque();
            }
        } catch (e) {
            setErro("Erro ao deletar item");
        }
    }

    useEffect(() => {
        carregarEstoque();
    }, []);

    if (carregando) {
        return <p>Carregando itens no estoque...</p>;
    }

    return (
        <div>
            <h1>Itens presentes no estoque</h1>
            
            {/* Painel de Filtros */}
            <FiltroPanel onFiltrar={handleFiltrar} onLimpar={handleLimpar} />
            
            {/* Indicador de modo */}
            <p style={{ fontStyle: "italic", color: "#666" }}>
                {modoFiltrado 
                    ? `Mostrando ${itens.length} item(ns) filtrado(s)` 
                    : `Mostrando todos os ${itens.length} itens no estoque`
                }
            </p>
            
            {/* Mensagem de erro */}
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            
            {/* Tabela */}
            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <EstoqueTabela itens={itens} onDeletar={handlerDeletar} />
            )}
        </div>
    );
}

export default EstoquePage;