import { useState } from "react";
import { cadastrarItem, cadastroECompra } from "../services/itemService";
import CadastroModal from "../components/CadastroModal";
import CadastroECompraModal from "../components/CadastroECompraModal";

function CadastroGeral() {
    const [message, setMessage] = useState("");
    // 'modalAtivo' pode ser: null, 'simples' ou 'compra'
    const [modalAtivo, setModalAtivo] = useState(null);

    // Função para fechar qualquer modal e limpar mensagens antigas
    function fecharModais() {
        setModalAtivo(null);
    }

    // Lógica para o Cadastro Simples (apenas o item)
    async function handleCadastroSimples(form) {
        try {
            await cadastrarItem(form);
            setMessage(`✅ Item "${form.nome}" cadastrado com sucesso!`);
        } catch (err) {
            setMessage(`❌ Erro ao cadastrar item: "${form.nome}".`);
        }
    }

    // Lógica para o Cadastro com Compra (item + estoque/preço)
    async function handleCadastroECompra(form) {
        try {
            await cadastroECompra(form);
            setMessage(`✅ Item "${form.nome}" cadastrado e compra registrada!`);
        } catch (err) {
            setMessage(`❌ Erro ao registrar cadastro e compra de: "${form.nome}".`);
        }
    }

    return (
        <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
            <h1>Gestão de Inventário</h1>
            <p>Selecione o tipo de operação que deseja realizar:</p>

            {/* Mensagem de Feedback */}
            {message && (
                <div style={{
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontWeight: "bold"
                }}>
                    {message}
                </div>
            )}


            <div style={{ display: "flex", gap: "15px" }}>
                <button
                    onClick={() => setModalAtivo('simples')}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Apenas Cadastrar Item
                </button>

                <button
                    onClick={() => setModalAtivo('compra')}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Cadastrar e Lançar Compra
                </button>
            </div>

            {/* Renderização Condicional dos Modais */}
            {modalAtivo === 'simples' && (
                <CadastroModal
                    onFechar={fecharModais}
                    onCadastrar={handleCadastroSimples}
                />
            )}

            {modalAtivo === 'compra' && (
                <CadastroECompraModal
                    onFechar={fecharModais}
                    onCadastrar={handleCadastroECompra}
                />
            )}
        </div>
    );
}

export default CadastroGeral;