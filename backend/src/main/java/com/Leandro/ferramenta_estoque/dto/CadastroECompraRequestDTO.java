package com.Leandro.ferramenta_estoque.dto;

import java.math.BigDecimal;

import com.Leandro.ferramenta_estoque.model.UnidadeMedida;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class CadastroECompraRequestDTO {
    @NotBlank(message = "Nome não pode ser vazio")
    @NotNull(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Categoria não pode ser vazia")
    @NotNull (message = "Categoria é obrigatória")
    private String categoria;

    private String subCategoria;

    @NotNull(message = "Unidade de medida é obrigatória")
    private UnidadeMedida unidadeMedida;

    @Positive(message = "A quantidade de itens precisa ser maior que zero")
    @NotNull(message = "Quantidade é obrigatória")
    private BigDecimal quantidade;

    @PositiveOrZero(message = "O preço total precisa ser igual ou maior que zero")
    private BigDecimal precoTotal;

    public CadastroECompraRequestDTO(){
        
    }

    public CadastroECompraRequestDTO(String nome, String categoria, String subCategoria, UnidadeMedida unidadeMedida,
            BigDecimal quantidade, BigDecimal precoTotal) {
        this.nome = nome;
        this.categoria = categoria;
        this.subCategoria = subCategoria;
        this.unidadeMedida = unidadeMedida;
        this.quantidade = quantidade;
        this.precoTotal = precoTotal;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPrecoTotal(BigDecimal precoTotal) {
        this.precoTotal = precoTotal;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getNome() {
        return nome;
    }

    public BigDecimal getPrecoTotal() {
        return precoTotal;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public String getSubCategoria() {
        return subCategoria;
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

}