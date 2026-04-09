package com.Leandro.ferramenta_estoque.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicidadeNomeException.class)
    public ResponseEntity<String> handleDuplicidade(DuplicidadeNomeException ex) {
        return ResponseEntity.status(409).body(ex.getMessage());
    }

    @ExceptionHandler(IdNaoEncontradoException.class)
    public ResponseEntity<String> handleNaoEncontrado(IdNaoEncontradoException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }
}