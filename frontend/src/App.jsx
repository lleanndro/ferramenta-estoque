import { useState } from "react";
import ItensPage from "./pages/ItensPage";
import MovimentacaoPage from "./pages/MovimentacaoPage";
import EstoquePage from "./pages/EstoquePage";
import CadastroGeral from "./pages/CadastroGeral";
import styles from "./styles/App.module.css";
import "./styles/globals.css";

function App() {
    const [pagina, setPagina] = useState("estoque");

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <div className={styles.navContainer}>
                    <button 
                        onClick={() => setPagina("estoque")}
                        className={`${styles.navButton} ${pagina === "estoque" ? styles.navButtonActive : ""}`}
                    >
                        Estoque
                    </button>
                    <button 
                        onClick={() => setPagina("itens")}
                        className={`${styles.navButton} ${pagina === "itens" ? styles.navButtonActive : ""}`}
                    >
                        Todos os Itens
                    </button>
                    <button 
                        onClick={() => setPagina("cadastro")}
                        className={`${styles.navButton} ${pagina === "cadastro" ? styles.navButtonActive : ""}`}
                    >
                        Cadastrar
                    </button>
                    <button 
                        onClick={() => setPagina("movimentacao")}
                        className={`${styles.navButton} ${pagina === "movimentacao" ? styles.navButtonActive : ""}`}
                    >
                        Movimentar
                    </button>
                </div>
            </nav>

            <div className={styles.contentContainer}>
                {pagina === "estoque" && <EstoquePage />}
                {pagina === "itens" && <ItensPage />}
                {pagina === "cadastro" && <CadastroGeral />}
                {pagina === "movimentacao" && <MovimentacaoPage />}
            </div>
        </div>
    );
}

export default App;