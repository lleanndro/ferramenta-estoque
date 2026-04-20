package com.Leandro.ferramenta_estoque.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.model.UnidadeMedida;;

public class FiltroItemRequestDTO {

    private String nome;
    private List<String> categorias;
    private List<String> subCategorias;
    private UnidadeMedida unidadeMedida;
    private String ordenarPor;
    private String direcao;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private TipoMovimentacao tipoMovimentacao;

    public FiltroItemRequestDTO() {
    }

    public FiltroItemRequestDTO(String nome, List<String> categorias, List<String> subCategorias, UnidadeMedida unidadeMedida,
            String ordenarPor, String direcao, LocalDateTime dataInicio, LocalDateTime dataFim,
            TipoMovimentacao tipoMovimentacao) {
        this.nome = nome;
        this.categorias = categorias;
        this.subCategorias = subCategorias;
        this.unidadeMedida = unidadeMedida;
        this.ordenarPor = ordenarPor;
        this.direcao = direcao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<String> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<String> categorias) {
        this.categorias = categorias;
    }

    public List<String> getSubCategorias() {
        return subCategorias;
    }

    public void setSubCategorias(List<String> subCategorias) {
        this.subCategorias = subCategorias;
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public String getOrdenarPor() {
        return ordenarPor;
    }

    public void setOrdenarPor(String ordenarPor) {
        this.ordenarPor = ordenarPor;
    }

    public String getDirecao() {
        return direcao;
    }

    public void setDirecao(String direcao) {
        this.direcao = direcao;
    }

    public LocalDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }
}