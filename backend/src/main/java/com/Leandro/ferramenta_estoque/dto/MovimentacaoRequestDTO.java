package com.Leandro.ferramenta_estoque.dto;

import java.math.BigDecimal;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class MovimentacaoRequestDTO {
    @NotNull(message = "o id do Item é obrigatório")
    private Long itemId;

    @NotNull (message = "O tipo da movimentação precisa ser informado.")
    private TipoMovimentacao tipoMovimentacao;

    @NotNull (message = "A quantidade movimentada precisa ser informada.")
    @Positive (message = "A quantidade movimentada precisa ser um número maior que zero.")
    private BigDecimal quantidade;

    @NotNull (message = "A preço da movimentação precisa ser informado.")
    @PositiveOrZero (message = "O preço da movimentação não pode ser um número negativo.")
    private BigDecimal precoTotal;

    public MovimentacaoRequestDTO(){
        
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
