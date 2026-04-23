function EstoqueTabela({ itens, onDeletar, onMovimentar }) {  // NOVO: onMovimentar
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
                    <th>Ações</th>
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
                            <button 
                                onClick={() => onMovimentar(item)}
                                style={{
                                    marginRight: "5px",
                                    padding: "5px 10px",
                                    backgroundColor: "#2196F3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                📦 Movimentar
                            </button>
                            <button 
                                onClick={() => onDeletar(item.id)}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                🗑️ Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EstoqueTabela;