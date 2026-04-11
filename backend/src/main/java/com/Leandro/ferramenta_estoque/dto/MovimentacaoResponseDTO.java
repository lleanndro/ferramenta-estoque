package com.Leandro.ferramenta_estoque.dto;

import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

public class MovimentacaoResponseDTO {
    @NotNull(message = "Nome do item movimentado precisa ser informado.")
    @NotBlank(message = "Nome do item movimentado não pode ser vazio.")
    private String nomeItem;

    @NotNull(message = "Tipo da movimentação precisa ser informado.")
    private TipoMovimentacao tipoMovimentacao;

    @NotNull(message = "ID da movimentação precisa ser informado.")
    private Long idMovimentacao;

    @NotNull(message = "Data da movimentação precisa ser informado.")
    private LocalDateTime data;

    @NotNull(message = "Tamanho da movimentação precisa ser informado.")
    @Positive(message = "Tamanho da movimentação precisa ser maior que zero.")
    private BigDecimal quantidade;

    @NotNull(message = "Preço da movimentação precisa ser informado.")
    @PositiveOrZero(message = "Preço da movimentação não pode ser negativo.")
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
