import { useState } from "react";

function FiltroPanel({ onFiltrar, onLimpar }) {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtros, setFiltros] = useState({
        nome: "",
        categorias: "",         // Agora é string separada por vírgula
        subCategorias: "",      // Idem
        unidadeMedida: "",
        ordenarPor: "",
        direcao: "ASC",
        dataInicio: "",
        dataFim: "",
        tipoMovimentacao: ""
    });

    function handleChange(campo, valor) {
        setFiltros(prev => ({ ...prev, [campo]: valor }));
    }

    function handleAplicar() {
        // Converte strings separadas por vírgula em arrays
        const filtrosProcessados = {
            ...filtros,
            categorias: filtros.categorias 
                ? filtros.categorias.split(',').map(c => c.trim()).filter(c => c)
                : [],
            subCategorias: filtros.subCategorias
                ? filtros.subCategorias.split(',').map(s => s.trim()).filter(s => s)
                : []
        };
        
        onFiltrar(filtrosProcessados);
    }

    function handleLimpar() {
        setFiltros({
            nome: "",
            categorias: "",
            subCategorias: "",
            unidadeMedida: "",
            ordenarPor: "",
            direcao: "ASC",
            dataInicio: "",
            dataFim: "",
            tipoMovimentacao: ""
        });
        onLimpar();
    }

    return (
        <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>🔍 Busca e Filtros</h3>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    {mostrarFiltros ? "Ocultar" : "Mostrar"} Filtros
                </button>
            </div>

            {mostrarFiltros && (
                <div style={{ marginTop: "15px" }}>
                
                    {/* SEARCH BAR - CATEGORIAS */}
                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>📂 Filtrar por categorias:</strong></label>
                        <input
                            type="text"
                            placeholder="Ex: FERRAMENTAS, MATERIAIS (separe por vírgula)"
                            value={filtros.categorias}
                            onChange={(e) => handleChange("categorias", e.target.value)}
                            style={{ 
                                width: "100%", 
                                padding: "8px", 
                                marginTop: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                        />
                        <small style={{ color: "#666" }}>
                            Separe múltiplas categorias por vírgula
                        </small>
                    </div>

                    {/* SEARCH BAR - SUBCATEGORIAS */}
                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>📁 Filtrar por subcategorias:</strong></label>
                        <input
                            type="text"
                            placeholder="Ex: FIXACAO, CORTE (separe por vírgula)"
                            value={filtros.subCategorias}
                            onChange={(e) => handleChange("subCategorias", e.target.value)}
                            style={{ 
                                width: "100%", 
                                padding: "8px", 
                                marginTop: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}
                        />
                        <small style={{ color: "#666" }}>
                            Separe múltiplas subcategorias por vírgula
                        </small>
                    </div>

                    <hr style={{ margin: "20px 0" }} />

                    {/* Unidade de Medida */}
                    <div style={{ marginBottom: "10px" }}>
                        <label><strong>📏 Unidade de Medida:</strong></label>
                        <select 
                            value={filtros.unidadeMedida}
                            onChange={(e) => handleChange("unidadeMedida", e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        >
                            <option value="">Todas</option>
                            <option value="UNIDADE">UNIDADE</option>
                            <option value="KG">KG</option>
                            <option value="LITRO">LITRO</option>
                            <option value="PACOTE">PACOTE</option>
                        </select>
                    </div>

                    {/* Ordenação */}
                    <div style={{ marginBottom: "10px" }}>
                        <label><strong>↕️ Ordenar por:</strong></label>
                        <select
                            value={filtros.ordenarPor}
                            onChange={(e) => handleChange("ordenarPor", e.target.value)}
                            style={{ marginLeft: "10px", marginRight: "10px", padding: "5px" }}
                        >
                            <option value="">Sem ordenação</option>
                            <option value="nome">Nome</option>
                            <option value="quantidade">Quantidade</option>
                            <option value="precoMedio">Preço Médio</option>
                            <option value="categoria">Categoria</option>
                        </select>
                        
                        <select
                            value={filtros.direcao}
                            onChange={(e) => handleChange("direcao", e.target.value)}
                            style={{ padding: "5px" }}
                        >
                            <option value="ASC">⬆️ Crescente</option>
                            <option value="DESC">⬇️ Decrescente</option>
                        </select>
                    </div>

                    {/* Filtro por Data de Movimentação */}
                    <div style={{ marginBottom: "10px" }}>
                        <label><strong>📅 Movimentações entre:</strong></label>
                        <input
                            type="datetime-local"
                            value={filtros.dataInicio}
                            onChange={(e) => handleChange("dataInicio", e.target.value)}
                            style={{ marginLeft: "10px", marginRight: "10px", padding: "5px" }}
                        />
                        <span>e</span>
                        <input
                            type="datetime-local"
                            value={filtros.dataFim}
                            onChange={(e) => handleChange("dataFim", e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        />
                    </div>

                    {/* Tipo de Movimentação */}
                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>📦 Tipo de Movimentação:</strong></label>
                        <select
                            value={filtros.tipoMovimentacao}
                            onChange={(e) => handleChange("tipoMovimentacao", e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        >
                            <option value="">Ambos</option>
                            <option value="ENTRADA">⬇️ Entrada (Compra)</option>
                            <option value="SAIDA">⬆️ Saída (Consumo)</option>
                        </select>
                    </div>

                    {/* Botões */}
                    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                        <button 
                            onClick={handleAplicar}
                            style={{ 
                                flex: 1,
                                padding: "10px 20px", 
                                backgroundColor: "#4CAF50", 
                                color: "white", 
                                border: "none", 
                                borderRadius: "4px", 
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            🔍 Aplicar Filtros
                        </button>
                        <button 
                            onClick={handleLimpar}
                            style={{ 
                                flex: 1,
                                padding: "10px 20px", 
                                backgroundColor: "#f44336", 
                                color: "white", 
                                border: "none", 
                                borderRadius: "4px", 
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            🗑️ Limpar e Mostrar Tudo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FiltroPanel;