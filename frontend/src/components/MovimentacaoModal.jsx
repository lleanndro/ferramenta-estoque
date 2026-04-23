import { useState } from "react";

function MovimentacaoModal({ item, onFechar, onRegistrar }) {
    const [form, setForm] = useState({
        tipoMovimentacao: "SAIDA",
        nomeItem: item.nome,  // Pré-preenchido com o item selecionado
        quantidade: "",
        precoTotal: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        onRegistrar(form);
        onFechar();
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0 }}>📦 Movimentar Item</h2>
                    <button
                        onClick={onFechar}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#999"
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{
                    padding: "15px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    marginBottom: "20px"
                }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Item selecionado:</p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "18px", color: "#4CAF50" }}>{item.nome}</p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                        Categoria: {item.categoria} | Quantidade atual: {item.quantidade} {item.unidadeMedida}
                    </p>
                </div>

                <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label htmlFor="tipoMovimentacao" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Tipo de Movimentação
                        </label>
                        <select
                            name="tipoMovimentacao"
                            value={form.tipoMovimentacao}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ddd",
                                borderRadius: "4px"
                            }}
                        >
                            <option value="SAIDA">⬆️ SAÍDA (Consumo)</option>
                            <option value="ENTRADA">⬇️ ENTRADA (Compra)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="quantidade" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            {form.tipoMovimentacao === "ENTRADA"
                                ? "Quantidade adicionada ao estoque:"
                                : "Quantidade consumida do estoque:"}
                        </label>
                        <input
                            type="number"
                            step="any"
                            name="quantidade"
                            onChange={handleChange}
                            value={form.quantidade}
                            placeholder="Digite a quantidade..."
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ddd",
                                borderRadius: "4px"
                            }}
                        />
                    </div>

                    {form.tipoMovimentacao === "ENTRADA" && (
                        <div>
                            <label htmlFor="precoTotal" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                Preço total gasto na compra:
                            </label>
                            <input
                                name="precoTotal"
                                type="number"
                                step="any"
                                onChange={handleChange}
                                value={form.precoTotal}
                                placeholder="Digite o preço total..."
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    fontSize: "16px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px"
                                }}
                            />
                        </div>
                    )}
                </form>

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        ✅ Registrar Movimentação
                    </button>
                    <button
                        onClick={onFechar}
                        style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        ✕ Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovimentacaoModal;