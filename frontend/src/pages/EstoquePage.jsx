import { useEffect, useState } from "react";
import EstoqueTabela from "../components/EstoqueTabela";
import FiltroPanel from "../components/FiltroPanel";
import MovimentacaoModal from "../components/MovimentacaoModal";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";
import { registrarMovimentacao } from "../services/movimentacaoService";
import styles from "../styles/EstoquePage.module.css";

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
        return <div className={styles.loading}>Carregando itens no estoque...</div>;
    }

    return (
        <div>
            <h1 className={styles.title}>Estoque</h1>

            {/* Search Bar Card */}
            <div className={styles.searchCard}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Buscar por nome do item..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={styles.searchInput}
                    />
                    <button onClick={handleBuscar} className={styles.btnPrimary}>
                        Buscar
                    </button>
                    <button onClick={handleLimparBusca} className={styles.btnSecondary}>
                        Limpar
                    </button>
                </div>
                <small className={styles.searchHint}>Busca por nome (parcial)</small>
            </div>

            <FiltroPanel onFiltrar={handleFiltrar} onLimpar={handleLimpar} />

            {message && <div className={styles.messageSuccess}>{message}</div>}

            <p className={styles.statusText}>
                {modoFiltrado
                    ? `Mostrando ${itens.length} item(ns) filtrado(s)`
                    : `Mostrando todos os ${itens.length} itens no estoque`
                }
            </p>

            {erro && <p className={styles.messageError}>{erro}</p>}

            {itens.length === 0 ? (
                <div className={styles.emptyState}>Nenhum item encontrado.</div>
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