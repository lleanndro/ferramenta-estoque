import { useEffect, useState } from "react";
import EstoqueTabela from "../components/EstoqueTabela";
import FiltroPanel from "../components/FiltroPanel";
import MovimentacaoModal from "../components/MovimentacaoModal";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";
import { registrarMovimentacao } from "../services/movimentacaoService";

function EstoquePage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [modoFiltrado, setModoFiltrado] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");
    const [message, setMessage] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    async function carregarEstoque() {
        try {
            setCarregando(true);
            setErro(null);
            const itensDados = await buscarItens({ ativo: true });
            setItens(itensDados);
            setModoFiltrado(false);
        } catch (e) {
            setErro("Erro ao carregar itens, tente novamente");
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
                ativo: true
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

    function handleLimparBusca() {
        setTermoBusca("");
        carregarEstoque();
    }

    async function handleFiltrar(filtros) {
        try {
            setCarregando(true);
            setErro(null);
            const filtrosFormatados = {
                ...filtros,
                ativo: true,
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
            setMessage("Item excluído com sucesso");
            setTimeout(() => setMessage(""), 3000);
            carregarEstoque();
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
            setMessage("Movimentação registrada com sucesso!");
            setTimeout(() => setMessage(""), 3000);
            carregarEstoque();
        } catch (e) {
            setMessage("Erro ao registrar movimentação.");
            setTimeout(() => setMessage(""), 3000);
        }
    }

    useEffect(() => {
        carregarEstoque();
    }, []);

    if (carregando) {
        return (
            <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>
                Carregando itens no estoque...
            </div>
        );
    }

    return (
        <div>
            {/* Título */}
            <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1A1A1A",
                marginBottom: "24px",
                letterSpacing: "-0.5px"
            }}>
                Estoque
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
                        onClick={handleLimparBusca}
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
                    Busca por nome (parcial)
                </small>
            </div>

            {/* Filtro Panel */}
            <FiltroPanel onFiltrar={handleFiltrar} onLimpar={handleLimpar} />

            {/* Messages */}
            {message && (
                <div style={{
                    padding: "12px 16px",
                    backgroundColor: "#6B8F7A",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    fontSize: "14px"
                }}>
                    {message}
                </div>
            )}

            {/* Status */}
            <p style={{ 
                fontStyle: "italic", 
                color: "#6B7280",
                marginBottom: "16px",
                fontSize: "14px"
            }}>
                {modoFiltrado
                    ? `Mostrando ${itens.length} item(ns) filtrado(s)`
                    : `Mostrando todos os ${itens.length} itens no estoque`
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

            {/* Tabela Card */}
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
                <EstoqueTabela
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

export default EstoquePage;