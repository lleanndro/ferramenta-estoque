package com.Leandro.ferramenta_estoque.service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.Leandro.ferramenta_estoque.dto.FiltroItemRequestDTO;
import com.Leandro.ferramenta_estoque.dto.ItemResponseDTO;
import com.Leandro.ferramenta_estoque.filter.ItemPredicates;
import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.repository.ItemRepository;

import java.util.Comparator;

@Service
public class BuscaService {
    private final ItemRepository itemRepository;
    private final ItemPredicates itemPredicates;

    public BuscaService(ItemRepository itemRepository, ItemPredicates itemPredicates) {
        this.itemRepository = itemRepository;
        this.itemPredicates = itemPredicates;
    }

    public List<ItemResponseDTO> buscarComFiltros(FiltroItemRequestDTO filtros) {
        List<Item> itens = itemRepository.findByAtivoTrue();

        Stream<Item> stream = aplicarFiltros(itens.stream(), filtros);

        stream = aplicarOrdenacao(stream, filtros.getOrdenarPor(), filtros.getDirecao());

        return stream
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private Stream<Item> aplicarFiltros(Stream<Item> stream, FiltroItemRequestDTO filtros) {
        List<Predicate<Item>> predicados = new ArrayList<>();

        itemPredicates.obterFiltroNome(filtros.getNome())
            .ifPresent(predicados::add);
        
        itemPredicates.obterFiltroCategoria(filtros.getCategorias())
            .ifPresent(predicados::add);
        
        itemPredicates.obterFiltroSubCategoria(filtros.getSubCategorias())
            .ifPresent(predicados::add);

        itemPredicates.obterFiltroUnidadeMedida(filtros.getUnidadeMedida())
                .ifPresent(predicados::add);

        itemPredicates.obterFiltroMovimentacao(
                filtros.getDataInicio(),
                filtros.getDataFim(),
                filtros.getTipoMovimentacao()).ifPresent(predicados::add);

        return predicados.isEmpty()
                ? stream
                : stream.filter(item -> predicados.stream().allMatch(p -> p.test(item)));
    }

    private Stream<Item> aplicarOrdenacao(Stream<Item> stream, String ordenarPor, String direcao) {
        if (ordenarPor == null) {
            return stream;
        }

        Comparator<Item> comparator = obterComparador(ordenarPor);

        if (comparator == null) {
            return stream;
        }

        if ("DESC".equalsIgnoreCase(direcao)) {
            comparator = comparator.reversed();
        }

        return stream.sorted(comparator);
    }

    private Comparator<Item> obterComparador(String campo) {
        if (campo == null) {
            return null;
        }

        switch (campo.toLowerCase()) {
            case "quantidade":
                return Comparator.comparing(Item::getQuantidade);
            case "precomedio":
            case "preco_medio":
                return Comparator.comparing(Item::getPrecoMedio, Comparator.nullsLast(Comparator.naturalOrder()));
            case "ultimopreco":
            case "ultimo_preco":
                return Comparator.comparing(Item::getUltimoPreco, Comparator.nullsLast(Comparator.naturalOrder()));
            case "nome":
                return Comparator.comparing(Item::getNome);
            case "categoria":
                return Comparator.comparing(Item::getCategoria);
            case "subcategoria":
            case "sub_categoria":
                return Comparator.comparing(Item::getSubCategoria);
            default:
                return null;
        }
    }

    private ItemResponseDTO toDTO(Item item) {
        return new ItemResponseDTO(item.getId(), item.getNome(), item.getCategoria(), item.getSubCategoria(),
                item.getUnidadeMedida(), item.getUltimoPreco(), item.getQuantidade(), item.getPrecoMedio(),
                item.getAtivo());
    }
}