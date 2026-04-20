package com.Leandro.ferramenta_estoque.dto;

import java.math.BigDecimal;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class MovimentacaoRequestDTO {
    @NotNull(message = "ID do item movimentado precisa ser informado")
    private Long itemId;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "O tipo de movimentação precisa ser informado")
    private TipoMovimentacao tipoMovimentacao;

    @Positive(message = "A quantidade de itens precisa ser maior que zero")
    @NotNull(message = "Quantidade é obrigatória")
    private BigDecimal quantidade;

    @PositiveOrZero(message = "O preço total precisa ser igual ou maior que zero")
    private BigDecimal precoTotal;

    public MovimentacaoRequestDTO(){
        
    }

    
    public MovimentacaoRequestDTO(Long itemId, TipoMovimentacao tipoMovimentacao, BigDecimal quantidade,
            BigDecimal precoTotal) {
        this.itemId = itemId;
        this.tipoMovimentacao = tipoMovimentacao;
        this.quantidade = quantidade;
        this.precoTotal = precoTotal;
    }
    public Long getItemId() {
        return itemId;
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
    public void setItemId(Long itemId) {
        this.itemId = itemId;
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

}
