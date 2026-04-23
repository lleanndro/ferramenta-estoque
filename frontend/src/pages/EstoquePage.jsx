import {useEffect, useState } from "react";
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
            carregarEstoque();
        } catch (e) {
            setErro("Erro ao deletar item");
        }
    }

    // NOVO: Modal
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
            setMessage("Movimentação do item " + form.nomeItem + " foi realizada com sucesso!");
            carregarEstoque();
        } catch (e) {
            setMessage("Erro ao registrar movimentação do item " + form.nomeItem + ".");
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
                        onClick={handleLimparBusca}
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
                    Busca por nome (parcial).
                </small>
            </div>
            
            <FiltroPanel onFiltrar={handleFiltrar} onLimpar={handleLimpar} />
            <p>{message}</p>
            <p style={{ fontStyle: "italic", color: "#666" }}>
                {modoFiltrado
                    ? `Mostrando ${itens.length} item(ns) filtrado(s) (apenas ativos)`
                    : `Mostrando todos os ${itens.length} itens no estoque (ativos)`
                }
            </p>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <EstoqueTabela
                    itens={itens}
                    onDeletar={handlerDeletar}
                    onMovimentar={handleAbrirModal}  // NOVO
                />
            )}

            {/* MODAL */}
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