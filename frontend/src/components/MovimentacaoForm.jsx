import { useState } from "react";

function MovimentacaoForm({ onCadastrar }) {
    const [form, setForm] = useState({
        tipoMovimentacao: "SAIDA",
        nomeItem: "",
        quantidade: "",
        precoTotal: ""
    });
    function handleChange(e) {
        setForm(({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit() {
        onCadastrar(form);
        setForm({
            tipoMovimentacao: "SAIDA",
            nomeItem: "",
            quantidade: "",
            precoTotal: ""
        })
    }
    return (
        <div>
            <h2>Registrar Movimentação</h2>
            <form>
                <label htmlFor="tipoMovimentacao">Selecione o tipo da movimentação</label>
                <select name="tipoMovimentacao" value={form.tipoMovimentacao} onChange={handleChange}>
                    <option value="SAIDA">SAIDA</option>
                    <option value="ENTRADA">ENTRADA</option>  
                </select>

                <label htmlFor="nomeItem">Insira o nome do item:</label>
                <input type="text" name="nomeItem" onChange={handleChange} value={form.nomeItem} placeholder="..." />

                <label htmlFor="quantidade">
                    {form.tipoMovimentacao === "ENTRADA" ? "Insira a quantidade inserida no estoque:" :
                        "Insira a quantidade que foi consumida do estoque:"}
                </label>
                <input type="number" step="any" name="quantidade" onChange={handleChange} value={form.quantidade} placeholder="..." />

                {form.tipoMovimentacao === "ENTRADA" && (
                    <>
                        <label htmlFor="precoTotal">Insira o preço total que foi gasto na compra do item:</label>
                        <input name="precoTotal" type="number" step="any" onChange={handleChange} value={form.precoTotal} placeholder="..." />
                    </>
                )}
            </form>
            <button onClick={handleSubmit}>Registrar movimentação</button>
        </div>
    )
}
export default MovimentacaoForm;