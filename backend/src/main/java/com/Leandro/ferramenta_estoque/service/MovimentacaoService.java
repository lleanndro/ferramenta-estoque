package com.Leandro.ferramenta_estoque.service;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.Leandro.ferramenta_estoque.dto.MovimentacaoRequestDTO;
import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.model.Movimentacao;
import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;
import com.Leandro.ferramenta_estoque.repository.MovimentacaoRepository;

import jakarta.transaction.Transactional;

@Service
public class MovimentacaoService {
    private final MovimentacaoRepository repository;
    private final ItemService itemService;

    MovimentacaoService(MovimentacaoRepository repository, ItemService itemService) {
        this.repository = repository;
        this.itemService = itemService;
    }

    @Transactional
    public Movimentacao registrarMovimentacao(MovimentacaoRequestDTO dto) {
        Item item = itemService.buscarPorId(dto.getItemId());
        Movimentacao movimentacaoItem = new Movimentacao();
        movimentacaoItem.setTipoMovimentacao(dto.getTipoMovimentacao());
        
        if(movimentacaoItem.getTipoMovimentacao() == TipoMovimentacao.ENTRADA){
            itemService.atualizarAposEntrada(dto.getPrecoTotal(),dto.getQuantidade(), item);
        }
        else if(movimentacaoItem.getTipoMovimentacao() == TipoMovimentacao.SAIDA){
            itemService.atualizarAposSaida(dto.getQuantidade(),item);
        }
        
        movimentacaoItem.setItem(item);
        movimentacaoItem.setQuantidade(dto.getQuantidade());
        movimentacaoItem.setPrecoTotal(dto.getPrecoTotal());
        movimentacaoItem.setData(LocalDateTime.now());

        return repository.save(movimentacaoItem);
    }
}
