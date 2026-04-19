package com.Leandro.ferramenta_estoque.filter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.model.Movimentacao;
import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.repository.MovimentacaoRepository;

/**
 * Factory de Predicados para filtragem de itens.
 * Cada método retorna Optional<Predicate<Item>>.
 */
@Component
public class ItemPredicates {

    private final MovimentacaoRepository movimentacaoRepository;

    public ItemPredicates(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    public Optional<Predicate<Item>> obterFiltroCategoria(List<String> categorias) {
        if (categorias == null || categorias.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(item -> categorias.contains(item.getCategoria()));
    }

    public Optional<Predicate<Item>> obterFiltroSubCategoria(List<String> subCategorias) {
        if (subCategorias == null || subCategorias.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(item -> subCategorias.contains(item.getSubCategoria()));
    }

    public Optional<Predicate<Item>> obterFiltroUnidadeMedida(String unidadeMedida) {
        if (unidadeMedida == null) {
            return Optional.empty();
        }
        return Optional.of(item -> item.getUnidadeMedida().equals(unidadeMedida));
    }

    /**
     * Filtro: Item teve movimentação em janela de tempo.
     */
    public Optional<Predicate<Item>> obterFiltroMovimentacao(
        LocalDateTime inicio,
        LocalDateTime fim,
        TipoMovimentacao tipo
    ) {
        if (inicio == null && fim == null) {
            return Optional.empty();
        }

        return Optional.of(item -> {
            List<Movimentacao> movimentacoes = buscarMovimentacoesPorPeriodo(item, inicio, fim);

            if (tipo != null) {
                movimentacoes = movimentacoes.stream()
                    .filter(m -> m.getTipoMovimentacao() == tipo)
                    .collect(Collectors.toList());
            }

            return !movimentacoes.isEmpty();
        });
    }

    private List<Movimentacao> buscarMovimentacoesPorPeriodo(
        Item item,
        LocalDateTime inicio,
        LocalDateTime fim
    ) {
        if (inicio != null && fim != null) {
            return movimentacaoRepository.findByItemAndDataBetween(item, inicio, fim);
        } else if (inicio != null) {
            return movimentacaoRepository.findByItemAndDataGreaterThanEqual(item, inicio);
        } else if (fim != null) {
            return movimentacaoRepository.findByItemAndDataLessThanEqual(item, fim);
        }
        return movimentacaoRepository.findByItem(item);
    }
}