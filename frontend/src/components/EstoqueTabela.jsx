function EstoqueTabela({ itens, onDeletar }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Subcategoria</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Preço médio(unitário)</th>
                    <th>Ultimo preço de compra (unitário)</th>
                </tr>
            </thead>
            <tbody>
                {itens.map(item => (
                    <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.categoria}</td>
                        <td>{item.subCategoria}</td>
                        <td>{item.unidadeMedida}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.precoMedio}</td>
                        <td>{item.ultimoPreco}</td>
                        <td>
                            <button onClick={() => onDeletar(item.id)}>Excluir Item</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default EstoqueTabela;