package com.Leandro.ferramenta_estoque.exception;

public class IdNaoEncontradoException extends RuntimeException {
    public IdNaoEncontradoException(Long id){
        super("Não foi encontrado um item com este id no sistema: " + id);
    }
}
