package com.Leandro.ferramenta_estoque.exception;

public class DuplicidadeNomeException extends RuntimeException {
    public DuplicidadeNomeException(String nome){
        super("Já existe um item cadastrado com este nome: " + nome);
    }
}