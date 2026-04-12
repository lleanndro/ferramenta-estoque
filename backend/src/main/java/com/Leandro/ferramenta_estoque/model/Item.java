package com.Leandro.ferramenta_estoque.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "itens")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco_medio")
    private BigDecimal precoMedio;

    @Positive(message = "Preço deve ser maior que zero")
    @Column(name = "ultimo_preco")
    private BigDecimal ultimoPreco;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidade_medida")
    @NotNull(message = "Unidade de medida é obrigatória")
    private UnidadeMedida unidadeMedida;

    @NotBlank(message = "Categoria é obrigatória")
    @Column(name = "categoria")
    private String categoria;

    @Column(name = "sub_categoria")
    private String subCategoria;

    @PositiveOrZero(message = "Quantidade deve ser maior que zero")
    @Column(name = "quantidade")
    private BigDecimal quantidade;

    @Column(name = "ativo")
    private Boolean ativo;

    public Item(String nome, UnidadeMedida unidadeMedida, String categoria, String subCategoria) {
        this.nome = nome;
        this.unidadeMedida = unidadeMedida;
        this.categoria = categoria;
        this.subCategoria = subCategoria;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public Item() {

    }

    public String getCategoria() {
        return categoria;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public BigDecimal getPrecoMedio() {
        return precoMedio;
    }

    public String getSubCategoria() {
        return subCategoria;
    }

    public BigDecimal getUltimoPreco() {
        return ultimoPreco;
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPrecoMedio(BigDecimal precoMedio) {
        this.precoMedio = precoMedio;
    }

    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
    }

    public void setUltimoPreco(BigDecimal ultimoPreco) {
        this.ultimoPreco = ultimoPreco;
    }

    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

}
