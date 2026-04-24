import { useState } from "react";
import ItensPage from "./pages/ItensPage";
import MovimentacaoPage from "./pages/MovimentacaoPage";
import EstoquePage from "./pages/EstoquePage";
import CadastroGeral from "./pages/CadastroGeral";

function App() {
    const [pagina, setPagina] = useState("estoque");

    const navButtonStyle = (isActive) => ({
        padding: "12px 24px",
        backgroundColor: isActive ? "#1A1A1A" : "transparent",
        color: isActive ? "#FFFFFF" : "#1A1A1A",
        border: "none",
        borderBottom: isActive ? "3px solid #1A1A1A" : "3px solid transparent",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: isActive ? "600" : "500",
        transition: "all 0.2s ease",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    });

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#F5F5F5",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
            {/* Navigation Horizontal */}
            <nav style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                marginBottom: "32px",
                position: "sticky",
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    gap: "8px",
                    padding: "0 24px"
                }}>
                    <button 
                        onClick={() => setPagina("estoque")}
                        style={navButtonStyle(pagina === "estoque")}
                    >
                        Estoque
                    </button>
                    <button 
                        onClick={() => setPagina("itens")}
                        style={navButtonStyle(pagina === "itens")}
                    >
                        Todos os Itens
                    </button>
                    <button 
                        onClick={() => setPagina("cadastro")}
                        style={navButtonStyle(pagina === "cadastro")}
                    >
                        Cadastrar
                    </button>
                    <button 
                        onClick={() => setPagina("movimentacao")}
                        style={navButtonStyle(pagina === "movimentacao")}
                    >
                        Movimentar
                    </button>
                </div>
            </nav>

            {/* Content Container */}
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 24px 40px 24px"
            }}>
                {pagina === "estoque" && <EstoquePage />}
                {pagina === "itens" && <ItensPage />}
                {pagina === "cadastro" && <CadastroGeral />}
                {pagina === "movimentacao" && <MovimentacaoPage />}
            </div>
        </div>
    );
}

export default App;