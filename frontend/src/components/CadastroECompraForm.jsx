import { useState } from "react";
function CadastroECompraForm({ onCadastrar }) {
    const [form, setForm] = useState({
        nome: "",
        categoria: "",
        subCategoria: "",
        unidadeMedida: "KG",
        quantidade: "",
        precoTotal: ""
    });
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit() {
        onCadastrar(form);
        setForm({
            nome: "",
            categoria: "",
            subCategoria: "",
            unidadeMedida: "KG",
            quantidade: "",
            precoTotal: ""
        });
    }
    return (
        <div>
            <h2>Cadastrar e registrar compra do item</h2>
            <form>
                <label htmlFor="nome">Nome do item:</label>
                <input type="text" name="nome" onChange={handleChange} value={form.nome} placeholder="..." />

                <label htmlFor="categoria">Categoria do item:</label>
                <input type="text" name="categoria" onChange={handleChange} value={form.categoria} placeholder="..." />

                <label htmlFor="subCategoria">Sub-categoria do item:</label>
                <input type="text" name="subCategoria" onChange={handleChange} value={form.subCategoria} placeholder="..." />

                <label htmlFor="unidadeMedida">Selecione a unidade de medida do item:</label>
                <select name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange}>
                    <option value="KG">KG</option>
                    <option value="LITRO">Litro</option>
                    <option value="UNIDADE">Unidade</option>
                    <option value="ML">ML</option>
                    <option value="GRAMA">Grama</option>
                    <option value="PACOTE">Pacote</option>
                    <option value="CAIXA">Caixa</option>
                </select>
                <label htmlFor="quantidade">Insira a quantidade inserida no estoque </label>
                <input type="number" step="any" name="quantidade" onChange={handleChange} value={form.quantidade} placeholder="..." />
                <label htmlFor="precoTotal">Insira o preço total que foi gasto na compra do item:</label>
                <input name="precoTotal" type="number" step="any" onChange={handleChange} value={form.precoTotal} placeholder="..." />
            </form>
            <button onClick={handleSubmit}>Cadastrar item com a compra</button>
        </div>
    );
}
export default CadastroECompraForm;