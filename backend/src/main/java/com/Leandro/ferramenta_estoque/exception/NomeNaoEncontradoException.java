package com.Leandro.ferramenta_estoque.exception;

public class NomeNaoEncontradoException extends RuntimeException {
    public NomeNaoEncontradoException(String nome){
        super("Não foi encontrado um item com este nome no sistema: " + nome);
    }
}
