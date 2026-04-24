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

    function handleAbrirModal(item) {
        setItemSelecionado(item);
        setModalAberto(true);
    }

    function handleFecharModal() {
        setModalAberto(false);
        setItemSelecionado(null);
    }

    async function handleRegistrarMovimentacao(form) {
        try {
            await registrarMovimentacao(form);
            alert("Movimentação registrada com sucesso!");
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
        return (
            <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>
                Carregando itens...
            </div>
        );
    }

    return (
        <div>
            <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1A1A1A",
                marginBottom: "24px",
                letterSpacing: "-0.5px"
            }}>
                Todos os Itens Cadastrados
            </h1>

            {/* Search Bar Card */}
            <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
            }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Buscar por nome do item..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{
                            flex: 1,
                            padding: "12px 16px",
                            fontSize: "15px",
                            border: "1px solid #E5E7EB",
                            borderRadius: "6px",
                            outline: "none",
                            transition: "border 0.2s ease",
                            fontFamily: "inherit"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#6B7280"}
                        onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                    />
                    <button
                        onClick={handleBuscar}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#4A4A4A",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "15px",
                            transition: "background-color 0.2s ease",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#2A2A2A"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#4A4A4A"}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={handleLimpar}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "transparent",
                            color: "#6B7280",
                            border: "1px solid #E5E7EB",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "15px",
                            transition: "all 0.2s ease",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = "#6B7280";
                            e.target.style.color = "#1A1A1A";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = "#E5E7EB";
                            e.target.style.color = "#6B7280";
                        }}
                    >
                        Limpar
                    </button>
                </div>
                <small style={{ 
                    color: "#6B7280", 
                    marginTop: "8px", 
                    display: "block",
                    fontSize: "13px"
                }}>
                    Busca por nome (parcial) • Pressione Enter ou clique em Buscar
                </small>
            </div>

            <p style={{ 
                fontStyle: "italic", 
                color: "#6B7280",
                marginBottom: "16px",
                fontSize: "14px"
            }}>
                {termoBusca 
                    ? `Encontrados ${itens.length} item(ns) com "${termoBusca}"` 
                    : `Total de ${itens.length} itens cadastrados`
                }
            </p>

            {erro && (
                <p style={{ 
                    color: "#8F6B6B",
                    backgroundColor: "#FFF5F5",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    marginBottom: "16px"
                }}>
                    {erro}
                </p>
            )}

            {itens.length === 0 ? (
                <div style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "48px 24px",
                    textAlign: "center",
                    color: "#6B7280",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
                }}>
                    Nenhum item encontrado.
                </div>
            ) : (
                <ItemTabela 
                    itens={itens} 
                    onDeletar={handlerDeletar}
                    onMovimentar={handleAbrirModal}
                />
            )}
        
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