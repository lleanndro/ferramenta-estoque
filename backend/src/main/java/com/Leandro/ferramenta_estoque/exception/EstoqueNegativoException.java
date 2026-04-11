package com.Leandro.ferramenta_estoque.exception;

import java.math.BigDecimal;

public class EstoqueNegativoException extends RuntimeException {
    public EstoqueNegativoException(BigDecimal quantidade){
        super("Não é permitido que o estoque fique negativo, é invalido a sáida dessa quantidade: " + quantidade);
    }
}
