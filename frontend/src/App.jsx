import { useState } from "react";
import ItensPage from "./pages/ItensPage";
import CadastroPage from "./pages/CadastroPage";
import MovimentacaoPage from "./pages/MovimentacaoPage";
import CadastroECompraPage from "./pages/CadastroECompraPage";
import EstoquePage from "./pages/EstoquePage";

function App() {
    const [pagina, setPagina] = useState("itens");

    return (
        <div>
            <nav>
                <button onClick={() => setPagina("itens")}>Ver itens cadastrados</button>
                <button onClick={() => setPagina("cadastro")}>Cadastrar Item</button>
                <button onClick={() => setPagina("cadastro-compra")}>Cadastrar e comprar item</button>
                <button onClick={() => setPagina("movimentacao")}>Movimentar itens do estoque</button>
                <button onClick={() => setPagina("estoque")}>Ver estoque</button>
            </nav>

            {pagina === "itens" && <ItensPage />}
            {pagina === "cadastro" && <CadastroPage />}
            {pagina === "movimentacao" && <MovimentacaoPage />}
            {pagina === "cadastro-compra" && <CadastroECompraPage />}
            {pagina === "estoque" && <EstoquePage />}
        </div>
    );
}

export default App;