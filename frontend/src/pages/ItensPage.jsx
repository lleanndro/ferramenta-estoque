import { useEffect, useState } from "react";
import ItemTabela from "../components/ItemTabela";
import MovimentacaoModal from "../components/MovimentacaoModal";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";
import { registrarMovimentacao } from "../services/movimentacaoService";

function ItensPage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [termoBusca, setTermoBusca] = useState("");
    
    // Estados do modal
    const [modalAberto, setModalAberto] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    async function carregarTodos() {
        try {
            setCarregando(true);
            setErro(null);
            const resultado = await buscarItens({ ativo: null });
            setItens(resultado);
        } catch (e) {
            setErro("Erro ao carregar itens: " + e.message);
        } finally {
            setCarregando(false);
        }
    }

    async function handleBuscar() {
        try {
            setCarregando(true);
            setErro(null);
            const resultado = await buscarItens({ 
                nome: termoBusca,
                ativo: null
            });
            setItens(resultado);
        } catch (e) {
            setErro("Erro ao buscar: " + e.message);
        } finally {
            setCarregando(false);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }

    function handleLimpar() {
        setTermoBusca("");
        carregarTodos();
    }

    async function handlerDeletar(id) {
        try {
            await deletarItem(id);
            if (termoBusca) {
                handleBuscar();
            } else {
                carregarTodos();
            }
        } catch (e) {
            setErro("Erro ao deletar item");
        }
    }

    // NOVO: Abre modal
    function handleAbrirModal(item) {
        setItemSelecionado(item);
        setModalAberto(true);
    }

    // NOVO: Fecha modal
    function handleFecharModal() {
        setModalAberto(false);
        setItemSelecionado(null);
    }

    // NOVO: Registra movimentação
    async function handleRegistrarMovimentacao(form) {
        try {
            await registrarMovimentacao(form);
            alert("Movimentação registrada com sucesso!");
            
            // Recarrega a lista
            if (termoBusca) {
                handleBuscar();
            } else {
                carregarTodos();
            }
        } catch (e) {
            alert("Erro ao registrar movimentação: " + e.message);
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

            <p style={{ fontStyle: "italic", color: "#666" }}>
                {termoBusca 
                    ? `Encontrados ${itens.length} item(ns) com "${termoBusca}"` 
                    : `Total de ${itens.length} itens cadastrados`
                }
            </p>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <ItemTabela 
                    itens={itens} 
                    onDeletar={handlerDeletar}
                    onMovimentar={handleAbrirModal}  // NOVO
                />
            )}
        
            {/* MODAL DE MOVIMENTAÇÃO */}
            {modalAberto && itemSelecionado && (
                <MovimentacaoModal
                    item={itemSelecionado}
                    onFechar={handleFecharModal}
                    onRegistrar={handleRegistrarMovimentacao}
                />
            )}
        </div>
    );
}

export default ItensPage;