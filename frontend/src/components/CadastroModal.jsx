import { useState } from "react";

function CadastroModal({ onFechar, onCadastrar }) {
    const [form, setForm] = useState({
        nome: "",
        categoria: "",
        subCategoria: "",
        unidadeMedida: "KG",
    })

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box"
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // 2. Chame a função do pai passando o ESTADO 'form' (que está no seu useState)
        // Não passe o 'e' que veio no argumento da função!
        onCadastrar(form);

        // 3. Fecha o modal
        onFechar();
    }

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(1px)" // Um toque moderno de desfoque
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                maxWidth: "500px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>📦 Cadastrar e Comprar</h2>
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

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ fontWeight: "bold" }}>Nome do item *</label>
                        <input type="text" name="nome" onChange={handleChange} value={form.nome} style={inputStyle} placeholder="Ex: Arroz Integral" required />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: "bold" }}>Categoria</label>
                            <input type="text" name="categoria" onChange={handleChange} value={form.categoria} style={inputStyle} placeholder="Alimentos" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: "bold" }}>Sub-categoria</label>
                            <input type="text" name="subCategoria" onChange={handleChange} value={form.subCategoria} style={inputStyle} placeholder="Grãos" />
                        </div>
                    </div>

                    <div>
                        <label style={{ fontWeight: "bold" }}>Unidade de Medida</label>
                        <select name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange} style={inputStyle}>
                            <option value="KG">KG</option>
                            <option value="LITRO">Litro</option>
                            <option value="UNIDADE">Unidade</option>
                            <option value="ML">ML</option>
                            <option value="GRAMA">Grama</option>
                            <option value="PACOTE">Pacote</option>
                            <option value="CAIXA">Caixa</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                            type="submit"
                            style={{
                                flex: 2,
                                padding: "12px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            ✅ Registrar Cadastro
                        </button>
                        <button
                            type="button"
                            onClick={onFechar}
                            style={{
                                flex: 1,
                                padding: "12px",
                                backgroundColor: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroModal;