function itemTabela({itens}){
    return(
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Subcategoria</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {itens.map(item =>(
                    <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.categoria}</td>
                        <td>{item.subCategoria}</td>
                        <td>{item.unidadeMedida}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.ativo ? "Ativo":"Inativo"}</td>
                    </tr>
                    ))}
            </tbody>
        </table>     
    );
}
export default itemTabela;