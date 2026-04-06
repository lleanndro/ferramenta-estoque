package com.Leandro.ferramenta_estoque.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "itens")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco_medio")
    private Double precoMedio;

    @Column(name = "ultimo_preco")
    private Double ultimoPreco;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidade_medida")
    private UnidadeMedida unidadeMedida;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "sub_categoria")
    private String subCategoria;

    @Column(name = "quantidade")
    private Double quantidade;

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

    public Double getPrecoMedio() {
        return precoMedio;
    }

    public String getSubCategoria() {
        return subCategoria;
    }

    public Double getUltimoPreco() {
        return ultimoPreco;
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public Double getQuantidade() {
        return quantidade;
    }



    public void setQuantidade(Double quantidade) {
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

    public void setPrecoMedio(Double precoMedio) {
        this.precoMedio = precoMedio;
    }

    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
    }

    public void setUltimoPreco(Double ultimoPreco) {
        this.ultimoPreco = ultimoPreco;
    }

    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

}
