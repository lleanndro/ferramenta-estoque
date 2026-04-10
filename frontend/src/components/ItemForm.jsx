import {useState} from "react";


function ItemForm({ onCadastar }) {
    const [form, setForm] = useState({
        nome: "",
        categoria: "",
        subCategoria: "",
        unidadeMedida: ""
    });
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    function handleSubmit() {
        onCadastar(form);
        setForm({
            nome: "",
            categoria: "",
            subCategoria: "",
            unidadeMedida: ""
        })
    }
    return (
        <div>
            <h2>Cadastrar item</h2>
            <form>
                <label htmlFor="nome">Nome do item:</label>
                <input type="text" name="nome" onChange={handleChange} value={form.nome} placeholder="..."/>

                <label htmlFor="cateogoria">Categoria do item:</label>
                <input type="text" name="categoria" onChange={handleChange} value={form.categoria} placeholder="..."/>

                <label htmlFor="subCategoria">Sub-categoria do item:</label>
                <input type="text" name="subCategoria" onChange={handleChange} value={form.subCategoria} placeholder="..."/>

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
            </form>
            <button onClick={handleSubmit}>Cadastrar item</button>
        </div>
    );
}
export default ItemForm;