package com.Leandro.ferramenta_estoque.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.model.UnidadeMedida;

public class CadastroECompraResponseDTO {
    private Long id;
    private String nome;
    private String categoria;
    private String subCategoria;
    private UnidadeMedida unidadeMedida;
    private Boolean ativo;
    private BigDecimal quantidade;
    private BigDecimal precoMedio;
    private BigDecimal ultimoPreco;
    private TipoMovimentacao tipoMovimentacao;
    private Long idMovimentacao;
    private LocalDateTime data;

    public CadastroECompraResponseDTO(Long id, String nome, String categoria, String subCategoria,
            UnidadeMedida unidadeMedida, Boolean ativo, BigDecimal quantidade, BigDecimal precoMedio,
            BigDecimal ultimoPreco, TipoMovimentacao tipoMovimentacao, Long idMovimentacao, LocalDateTime data) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.subCategoria = subCategoria;
        this.unidadeMedida = unidadeMedida;
        this.ativo = ativo;
        this.quantidade = quantidade;
        this.precoMedio = precoMedio;
        this.ultimoPreco = ultimoPreco;
        this.tipoMovimentacao = tipoMovimentacao;
        this.idMovimentacao = idMovimentacao;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getSubCategoria() {
        return subCategoria;
    }

    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPrecoMedio() {
        return precoMedio;
    }

    public void setPrecoMedio(BigDecimal precoMedio) {
        this.precoMedio = precoMedio;
    }

    public BigDecimal getUltimoPreco() {
        return ultimoPreco;
    }

    public void setUltimoPreco(BigDecimal ultimoPreco) {
        this.ultimoPreco = ultimoPreco;
    }

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public Long getIdMovimentacao() {
        return idMovimentacao;
    }

    public void setIdMovimentacao(Long idMovimentacao) {
        this.idMovimentacao = idMovimentacao;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}
