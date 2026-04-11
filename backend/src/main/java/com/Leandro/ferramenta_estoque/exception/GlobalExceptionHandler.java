package com.Leandro.ferramenta_estoque.exception;

import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    @ExceptionHandler(NomeNaoEncontradoException.class)
    public ResponseEntity<String> handleNomeNaoEncontrado(NomeNaoEncontradoException ex){
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidacao(MethodArgumentNotValidException ex) {
        String erros = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(erro -> erro.getField() + ": " + erro.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity.status(400).body(erros);
    }

    @ExceptionHandler(EstoqueNegativoException.class)
    public ResponseEntity<String> handleEstoqueNegativo(EstoqueNegativoException ex){
        return ResponseEntity.status(409).body(ex.getMessage());
    }
}