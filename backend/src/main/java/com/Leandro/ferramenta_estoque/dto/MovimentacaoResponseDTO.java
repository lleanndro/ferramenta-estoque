package com.Leandro.ferramenta_estoque.dto;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MovimentacaoResponseDTO {
    private String nomeItem;
    private TipoMovimentacao tipoMovimentacao;
    private Long idMovimentacao;
    private LocalDateTime data;
    private BigDecimal quantidade;
    private BigDecimal precoTotal;

    public MovimentacaoResponseDTO() {

    }

    public MovimentacaoResponseDTO(LocalDateTime data, Long idMovimentacao, String nomeItem, BigDecimal precoTotal,
            BigDecimal quantidade, TipoMovimentacao tipoMovimentacao) {
                this.data = data;
                this.idMovimentacao = idMovimentacao;
                this.nomeItem = nomeItem;
                this.precoTotal = precoTotal;
                this.quantidade = quantidade;
                this.tipoMovimentacao = tipoMovimentacao;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public void setIdMovimentacao(Long idMovimentacao) {
        this.idMovimentacao = idMovimentacao;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public void setPrecoTotal(BigDecimal precoTotal) {
        this.precoTotal = precoTotal;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public LocalDateTime getData() {
        return data;
    }

    public Long getIdMovimentacao() {
        return idMovimentacao;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public BigDecimal getPrecoTotal() {
        return precoTotal;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

}
