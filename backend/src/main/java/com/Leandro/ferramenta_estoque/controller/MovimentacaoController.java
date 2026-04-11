package com.Leandro.ferramenta_estoque.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Leandro.ferramenta_estoque.dto.MovimentacaoRequestDTO;
import com.Leandro.ferramenta_estoque.dto.MovimentacaoResponseDTO;
import com.Leandro.ferramenta_estoque.service.MovimentacaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {
    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    @PostMapping
    public ResponseEntity<MovimentacaoResponseDTO> registarMovimentacao(
            @Valid @RequestBody MovimentacaoRequestDTO requestDTO) {
        MovimentacaoResponseDTO movimentacaoResponseDTO = movimentacaoService.registrarMovimentacao(requestDTO);
        return ResponseEntity.status(201).body(movimentacaoResponseDTO);
    }

    @GetMapping ("/buscar/{nome}")
    public ResponseEntity<List<MovimentacaoResponseDTO>> listarMovimentacaoPorItem(@PathVariable String nome) {
        List<MovimentacaoResponseDTO> movimentacoesDoItem = movimentacaoService.listarMovimentacoesPorItem(nome);
        return ResponseEntity.ok().body(movimentacoesDoItem);
    }
}
