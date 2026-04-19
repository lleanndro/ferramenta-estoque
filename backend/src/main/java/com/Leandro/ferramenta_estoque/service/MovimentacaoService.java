package com.Leandro.ferramenta_estoque.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.Leandro.ferramenta_estoque.dto.CadastroECompraRequestDTO;
import com.Leandro.ferramenta_estoque.dto.CadastroECompraResponseDTO;
import com.Leandro.ferramenta_estoque.dto.ItemRequestDTO;
import com.Leandro.ferramenta_estoque.dto.ItemResponseDTO;
import com.Leandro.ferramenta_estoque.dto.MovimentacaoRequestDTO;
import com.Leandro.ferramenta_estoque.dto.MovimentacaoResponseDTO;
import com.Leandro.ferramenta_estoque.exception.PrecoObrigatorioException;
import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.model.Movimentacao;
import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.repository.MovimentacaoRepository;

import jakarta.transaction.Transactional;

@Service
public class MovimentacaoService {

    private final MovimentacaoRepository repository;
    private final ItemService itemService;

    public MovimentacaoService(MovimentacaoRepository repository, ItemService itemService) {
        this.repository = repository;
        this.itemService = itemService;
    }

    @Transactional
    public MovimentacaoResponseDTO registrarMovimentacao(MovimentacaoRequestDTO dto) {

        Item item = itemService.buscarEntidadePorId(dto.getItemId());

        if (dto.getTipoMovimentacao() == TipoMovimentacao.ENTRADA) {
            if (dto.getPrecoTotal() == null) {
                throw new PrecoObrigatorioException();
            }
            itemService.atualizarAposEntrada(dto.getPrecoTotal(), dto.getQuantidade(), item);

        } else if (dto.getTipoMovimentacao() == TipoMovimentacao.SAIDA) {
            itemService.atualizarAposSaida(dto.getQuantidade(), item);
        }

        Movimentacao movimentacao = new Movimentacao(
                item,
                dto.getTipoMovimentacao(),
                dto.getQuantidade(),
                dto.getPrecoTotal(),
                LocalDateTime.now());

        Movimentacao movimentacaoSalva = repository.save(movimentacao);

        return toDTO(movimentacaoSalva);
    }

    public List<MovimentacaoResponseDTO> listarMovimentacoesPorItem(String nomeItem) {
        Item item = itemService.buscarEntidadePorNome(nomeItem);

        return repository.findByItem(item)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovimentacaoResponseDTO> listarMovimentacaoPorTipo(TipoMovimentacao tipoMovimentacao) {

        return repository.findByTipoMovimentacao(tipoMovimentacao)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CadastroECompraResponseDTO cadastroECompra(CadastroECompraRequestDTO cadastroECompraRequestDTO) {

        ItemRequestDTO itemRequestDTO = new ItemRequestDTO(cadastroECompraRequestDTO.getNome(),
                cadastroECompraRequestDTO.getCategoria(),
                cadastroECompraRequestDTO.getSubCategoria(),
                cadastroECompraRequestDTO.getUnidadeMedida());

        ItemResponseDTO itemSalvo = itemService.cadastrarItem(itemRequestDTO);

        MovimentacaoRequestDTO movimentacaoRequestDTO = new MovimentacaoRequestDTO(itemSalvo.getId(),
                TipoMovimentacao.ENTRADA,
                cadastroECompraRequestDTO.getQuantidade(),
                cadastroECompraRequestDTO.getPrecoTotal());

        MovimentacaoResponseDTO movimentacaoResponseDTO = registrarMovimentacao(movimentacaoRequestDTO);
        ItemResponseDTO itemAtualizado = itemService.buscarPorId(itemSalvo.getId());

        return new CadastroECompraResponseDTO(itemAtualizado.getId(), itemAtualizado.getNome(), itemAtualizado.getCategoria(),
                itemAtualizado.getSubCategoria(),
                itemAtualizado.getUnidadeMedida(),
                itemAtualizado.getAtivo(),
                itemAtualizado.getQuantidade(),
                itemAtualizado.getPrecoMedio(),
                itemAtualizado.getUltimoPreco(),
                movimentacaoResponseDTO.getTipoMovimentacao(),
                movimentacaoResponseDTO.getId(),
                movimentacaoResponseDTO.getData());
    }

    private MovimentacaoResponseDTO toDTO(Movimentacao mov) {
        return new MovimentacaoResponseDTO(mov.getData(), mov.getId(), mov.getItem().getNome(), mov.getPrecoTotal(),
                mov.getQuantidade(),
                mov.getTipoMovimentacao());
    }
}