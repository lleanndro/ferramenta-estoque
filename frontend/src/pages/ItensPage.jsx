import { useEffect, useState } from "react";
import ItemTabela from "../components/ItemTabela";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";

function ItensPage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [termoBusca, setTermoBusca] = useState("");

    // Carrega todos os itens (sem filtro de ativo)
    async function carregarTodos() {
        try {
            setCarregando(true);
            setErro(null);
            const resultado = await buscarItens({ ativo: null }); // null = todos
            setItens(resultado);
        } catch (e) {
            setErro("Erro ao carregar itens: " + e.message);
        } finally {
            setCarregando(false);
        }
    }

    // Busca por nome
    async function handleBuscar() {
        try {
            setCarregando(true);
            setErro(null);
            const resultado = await buscarItens({ 
                nome: termoBusca,
                ativo: null  // Busca em todos (ativos e inativos)
            });
            setItens(resultado);
        } catch (e) {
            setErro("Erro ao buscar: " + e.message);
        } finally {
            setCarregando(false);
        }
    }

    // Busca ao digitar Enter
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }

    // Limpar busca
    function handleLimpar() {
        setTermoBusca("");
        carregarTodos();
    }

    async function handlerDeletar(id) {
        try {
            await deletarItem(id);
            // Recarrega após deletar
            if (termoBusca) {
                handleBuscar();
            } else {
                carregarTodos();
            }
        } catch (e) {
            setErro("Erro ao deletar item");
        }
    }

    useEffect(() => {
        carregarTodos();
    }, []);

    if (carregando) {
        return <p>Carregando itens...</p>;
    }

    return (
        <div>
            <h1>Todos os Itens Cadastrados</h1>

            {/* SEARCH BAR */}
            <div style={{ 
                marginBottom: "20px", 
                padding: "15px", 
                backgroundColor: "#f0f0f0", 
                borderRadius: "8px" 
            }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar por nome do item..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{
                            flex: 1,
                            padding: "10px",
                            fontSize: "16px",
                            border: "2px solid #ddd",
                            borderRadius: "4px"
                        }}
                    />
                    <button
                        onClick={handleBuscar}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={handleLimpar}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#ff9800",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Limpar
                    </button>
                </div>
                <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
                    Busca por nome (parcial) • Pressione Enter ou clique em Buscar
                </small>
            </div>

            {/* Contador */}
            <p style={{ fontStyle: "italic", color: "#666" }}>
                {termoBusca 
                    ? `Encontrados ${itens.length} item(ns) com "${termoBusca}"` 
                    : `Total de ${itens.length} itens cadastrados`
                }
            </p>

            {/* Mensagem de erro */}
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {/* Tabela */}
            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <ItemTabela itens={itens} onDeletar={handlerDeletar} />
            )}
        </div>
    );
}

export default ItensPage;