package com.Leandro.ferramenta_estoque.exception;

public class PrecoObrigatorioException extends RuntimeException{
    public PrecoObrigatorioException(){
        super("Numa movimentação de ENTRADA, o preço precisa ser informado.");
    }
}
