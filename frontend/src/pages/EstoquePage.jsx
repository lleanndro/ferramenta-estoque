import { useEffect, useState } from "react";
import EstoqueTabela from "../components/EstoqueTabela";
import FiltroPanel from "../components/FiltroPanel";
import { deletarItem } from "../services/itemService";
import { buscarItens } from "../services/buscaService";

function EstoquePage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [modoFiltrado, setModoFiltrado] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");

    // Carrega estoque "cru" (só itens ativos, sem outros filtros)
    async function carregarEstoque() {
        try {
            setCarregando(true);
            setErro(null);
            const itensDados = await buscarItens({ ativo: true }); // ✅ Só ativos
            setItens(itensDados);
            setModoFiltrado(false);
        } catch (e) {
            setErro("Erro ao carregar itens, tente novamente");
        } finally {
            setCarregando(false);
        }
    }

    // Aplica filtros (mantém ativo=true fixo)
    async function handleFiltrar(filtros) {
        try {
            setCarregando(true);
            setErro(null);

            const filtrosFormatados = {
                ...filtros,
                ativo: true,  // ✅ Força sempre ativo=true na página de estoque
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
        carregarTodos();
    }

    async function handlerDeletar(id) {
        try {
            await deletarItem(id);
            carregarEstoque();
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
                    Busca por nome (parcial) • Pressione Enter ou clique em Buscar
                </small>
            </div>

            <FiltroPanel onFiltrar={handleFiltrar} onLimpar={handleLimpar} />

            <p style={{ fontStyle: "italic", color: "#666" }}>
                {modoFiltrado
                    ? `Mostrando ${itens.length} item(ns) filtrado(s)`
                    : `Mostrando todos os ${itens.length} itens no estoque`
                }
            </p>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {itens.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <EstoqueTabela itens={itens} onDeletar={handlerDeletar} />
            )}
        </div>
    );
}

export default EstoquePage;