package com.Leandro.ferramenta_estoque.dto;

import com.Leandro.ferramenta_estoque.model.UnidadeMedida;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemRequestDTO {
    @NotNull (message = "O nome do item precisa ser informado.")
    @NotBlank (message = "O nome do item não pode ser vazio.")
    private String nome;

    @NotNull (message = "A categoria do item precisa ser informada.")
    @NotBlank (message = "O nome da categoria não pode ser vazia.")
    private String categoria;

    @NotNull (message = "A subcategoria do item precisa ser informada.")
    private String subCategoria;

    @Enumerated (EnumType.STRING)
    @NotNull (message = "A unidade de medida do item precisa ser informada.")
    private UnidadeMedida unidadeMedida;

    public ItemRequestDTO(String nome, String categoria, String subCategoria, UnidadeMedida unidadeMedida){
        this.nome = nome;
        this.categoria = categoria;
        this.subCategoria = subCategoria;
        this.unidadeMedida = unidadeMedida;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
    }
    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }
    public String getCategoria() {
        return categoria;
    }
    public String getNome() {
        return nome;
    }
    public String getSubCategoria() {
        return subCategoria;
    }
    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }
}
