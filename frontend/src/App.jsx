import { useState } from "react";
import ItensPage from "./pages/ItensPage";
import CadastroPage from "./pages/CadastroPage";

function App() {
    const [pagina, setPagina] = useState("itens");

    return (
        <div>
            <nav>
                <button onClick={() => setPagina("itens")}>Ver Itens</button>
                <button onClick={() => setPagina("cadastro")}>Cadastrar Item</button>
            </nav>

            {pagina === "itens" && <ItensPage />}
            {pagina === "cadastro" && <CadastroPage />}
        </div>
    );
}

export default App;