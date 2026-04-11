package com.Leandro.ferramenta_estoque.model;

import jakarta.persistence.GenerationType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "movimentacoes_item")

public class Movimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_item")
    @NotNull(message = "Qual item foi movimentado precisa ser informado")
    private Item item;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_movimentacao")
    @NotNull(message = "O tipo de movimentação precisa ser informado")
    private TipoMovimentacao tipoMovimentacao;

    @Column(name = "quantidade")
    @Positive(message = "A quantidade de itens precisa ser maior que zero")
    private BigDecimal quantidade;

    @Column(name = "preco_total")
    @PositiveOrZero(message = "O preço total precisa ser igual ou maior que zero")
    private BigDecimal precoTotal;

    @Column(name = "data_movimentacao")
    private LocalDateTime data;

    public Movimentacao(Long id, Item item, TipoMovimentacao tipoMovimentacao, BigDecimal quantidade,
            BigDecimal precoTotal, LocalDateTime data) {
                this.id = id;
                this.item = item;
                this.tipoMovimentacao = tipoMovimentacao;
                this.quantidade = quantidade;
                this.precoTotal = precoTotal;
                this.data = data;
    }
    public Movimentacao(Item item, TipoMovimentacao tipoMovimentacao, BigDecimal quantidade,
            BigDecimal precoTotal, LocalDateTime data) {
                this.item = item;
                this.tipoMovimentacao = tipoMovimentacao;
                this.quantidade = quantidade;
                this.precoTotal = precoTotal;
                this.data = data;
    }


    public Movimentacao(){

    }

    public LocalDateTime getData() {
        return data;
    }

    public Long getId() {
        return id;
    }

    public Item getItem() {
        return item;
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

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setItem(Item item) {
        this.item = item;
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
