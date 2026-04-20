package com.Leandro.ferramenta_estoque.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.repository.ItemRepository;

import jakarta.transaction.Transactional;

import com.Leandro.ferramenta_estoque.dto.ItemRequestDTO;
import com.Leandro.ferramenta_estoque.dto.ItemResponseDTO;
import com.Leandro.ferramenta_estoque.exception.DuplicidadeNomeException;
import com.Leandro.ferramenta_estoque.exception.EstoqueNegativoException;
import com.Leandro.ferramenta_estoque.exception.IdNaoEncontradoException;
import com.Leandro.ferramenta_estoque.exception.NomeNaoEncontradoException;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public ItemResponseDTO cadastrarItem(ItemRequestDTO dto) {
        boolean nomeDuplicidade = repository.findByNome(dto.getNome()).isPresent();
        if (nomeDuplicidade) {
            throw new DuplicidadeNomeException(dto.getNome());
        }

        Item item = new Item(dto.getNome(), dto.getUnidadeMedida(), dto.getCategoria(), dto.getSubCategoria());
        item.setAtivo(false);
        item.setQuantidade(BigDecimal.ZERO);

        Item itemSalvo = repository.save(item);

        return toDTO(itemSalvo);
    }

    public List<ItemResponseDTO> listarTodosOsItens() {
        List<Item> listaItem = repository.findAll();
        return listaItem.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    public List<ItemResponseDTO> listarItensEstoque() {
        List<Item> listaItem = repository.findByAtivoTrue();
        return listaItem.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ItemResponseDTO buscarPorId(Long id) {
        Item item = repository.findById(id)
                .orElseThrow(() -> new IdNaoEncontradoException(id));
        return toDTO(item);
    }

    public Item buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IdNaoEncontradoException(id));
    }

    public Item buscarEntidadePorNome(String nome) {
        return repository.findByNome(nome)
                .orElseThrow(() -> new NomeNaoEncontradoException(nome));
    }

    public ItemResponseDTO buscarPorNome(String nome) {
        Item item = buscarEntidadePorNome(nome);
        return toDTO(item);
    }
    @Transactional
    public void deletarItem(Long id) {
        Item item = buscarEntidadePorId(id);
        repository.delete(item);
    }

    public Item atualizarAposEntrada(BigDecimal precoTotal, BigDecimal quantidadeAdicionada, Item item) {
        validarQuantidadeParaDivisao(quantidadeAdicionada);

        BigDecimal novaQuantidade = item.getQuantidade().add(quantidadeAdicionada);
        BigDecimal ultimoPreco = precoTotal.divide(quantidadeAdicionada, 2, RoundingMode.HALF_UP);
        BigDecimal precoMedioAtual = item.getPrecoMedio() != null ? item.getPrecoMedio() : BigDecimal.ZERO;
        BigDecimal somaDosPrecos = precoMedioAtual.multiply(item.getQuantidade()).add(precoTotal);
        BigDecimal novoPrecoMedio = somaDosPrecos.divide(novaQuantidade, 2, RoundingMode.HALF_UP);

        if (!item.getAtivo()) {
            item.setAtivo(true);
        }

        item.setUltimoPreco(ultimoPreco);
        item.setQuantidade(novaQuantidade);
        item.setPrecoMedio(novoPrecoMedio);

        return repository.save(item);
    }

    public Item atualizarAposSaida(BigDecimal quantidadeRetirada, Item item) {
        BigDecimal novaQuantidade = item.getQuantidade().subtract(quantidadeRetirada);

        if (novaQuantidade.compareTo(BigDecimal.ZERO) < 0) {
            throw new EstoqueNegativoException(quantidadeRetirada);
        }

        if (novaQuantidade.compareTo(BigDecimal.ZERO) == 0) {
            item.setAtivo(false);
        }

        item.setQuantidade(novaQuantidade);

        return repository.save(item);
    }

    private void validarQuantidadeParaDivisao(BigDecimal quantidade) {
        if (quantidade.compareTo(BigDecimal.ZERO) == 0) {
            throw new IllegalArgumentException("Quantidade inválida");
        }
    }
    
    private ItemResponseDTO toDTO(Item item) {
        return new ItemResponseDTO(item.getId(), item.getNome(), item.getCategoria(), item.getSubCategoria(),
                item.getUnidadeMedida(), item.getQuantidade(), item.getPrecoMedio(),item.getUltimoPreco(),
                item.getAtivo());
    }
}