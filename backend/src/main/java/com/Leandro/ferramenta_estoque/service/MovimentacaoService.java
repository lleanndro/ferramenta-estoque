package com.Leandro.ferramenta_estoque.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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
            if(dto.getPrecoTotal() == null){
                throw new PrecoObrigatorioException();
            }
            itemService.atualizarAposEntrada(dto.getPrecoTotal(), dto.getQuantidade(), item);
        } else if (dto.getTipoMovimentacao() == TipoMovimentacao.SAIDA) {
            itemService.atualizarAposSaida(dto.getQuantidade(), item);
        }
        Movimentacao movimentacao = new Movimentacao(item, dto.getTipoMovimentacao(), dto.getQuantidade(),
                dto.getPrecoTotal(), LocalDateTime.now());

        Movimentacao movimentacaoSalva = repository.save(movimentacao);
        
        return new MovimentacaoResponseDTO(movimentacaoSalva.getData(), movimentacaoSalva.getId(),
                movimentacaoSalva.getItem().getNome(), movimentacaoSalva.getPrecoTotal(),
                movimentacaoSalva.getQuantidade(), dto.getTipoMovimentacao());
    }

    public List<MovimentacaoResponseDTO> listarMovimentacoesPorItem(String nomeItem) {
        Item item = itemService.buscarEntidadePorNome(nomeItem);
        return repository.findByItem(item)
                .stream()
                .map(mov -> new MovimentacaoResponseDTO(
                        mov.getData(),
                        mov.getId(),
                        item.getNome(),
                        mov.getPrecoTotal(),
                        mov.getQuantidade(),
                        mov.getTipoMovimentacao()))
                .collect(Collectors.toList());
    }

    public List<MovimentacaoResponseDTO> listarMovimentacaoPorTipo(TipoMovimentacao tipoMovimentacao) {
        return repository.findByTipoMovimentacao(tipoMovimentacao)
                .stream()
                .map(mov -> new MovimentacaoResponseDTO(
                        mov.getData(),
                        mov.getId(),
                        mov.getItem().getNome(),
                        mov.getPrecoTotal(),
                        mov.getQuantidade(), 
                        mov.getTipoMovimentacao()))
                .collect(Collectors.toList());
        /// tem algum filtro de data nesse método? se não tiver como eu implemento? qual
        /// o papel de findByDataBeetwen
        /// nesse tipo de operação?
    }

}
