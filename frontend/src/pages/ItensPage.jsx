import { useEffect, useState } from "react";
import ItemTabela from "../components/ItemTabela";
import MovimentacaoModal from "../components/MovimentacaoModal";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";
import { registrarMovimentacao } from "../services/movimentacaoService";
import styles from "../styles/EstoquePage.module.css"; // Reutiliza os mesmos estilos

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
        return <div className={styles.loading}>Carregando itens...</div>;
    }

    return (
        <div>
            <h1 className={styles.title}>Todos os Itens Cadastrados</h1>

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
                    <button onClick={handleLimpar} className={styles.btnSecondary}>
                        Limpar
                    </button>
                </div>
                <small className={styles.searchHint}>
                    Busca por nome (parcial) • Pressione Enter ou clique em Buscar
                </small>
            </div>

            <p className={styles.statusText}>
                {termoBusca 
                    ? `Encontrados ${itens.length} item(ns) com "${termoBusca}"` 
                    : `Total de ${itens.length} itens cadastrados`
                }
            </p>

            {erro && <p className={styles.messageError}>{erro}</p>}

            {itens.length === 0 ? (
                <div className={styles.emptyState}>Nenhum item encontrado.</div>
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