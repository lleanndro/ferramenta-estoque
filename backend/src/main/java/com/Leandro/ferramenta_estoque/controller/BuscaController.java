package com.Leandro.ferramenta_estoque.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Leandro.ferramenta_estoque.dto.FiltroItemRequestDTO;
import com.Leandro.ferramenta_estoque.dto.ItemResponseDTO;
import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.service.BuscaService;

@RestController
@RequestMapping("/busca")
public class BuscaController {

    private final BuscaService buscaService;

    public BuscaController(BuscaService buscaService) {
        this.buscaService = buscaService;
    }

    @GetMapping("/itens")
    public ResponseEntity<List<ItemResponseDTO>> buscarItens(
            @RequestParam(required = false) List<String> categorias,
            @RequestParam(required = false) List<String> subCategorias,
            @RequestParam(required = false) String unidadeMedida,
            @RequestParam(required = false) String ordenarPor,
            @RequestParam(required = false, defaultValue = "ASC") String direcao,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataFim,
            @RequestParam(required = false) TipoMovimentacao tipoMovimentacao) {

        FiltroItemRequestDTO filtros = new FiltroItemRequestDTO(categorias, subCategorias, unidadeMedida, ordenarPor,
                direcao, dataInicio, dataFim, tipoMovimentacao);

        List<ItemResponseDTO> resultado = buscaService.buscarComFiltros(filtros);
        return ResponseEntity.ok(resultado);
    }
}