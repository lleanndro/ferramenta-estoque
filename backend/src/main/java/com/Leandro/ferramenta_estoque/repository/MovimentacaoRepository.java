package com.Leandro.ferramenta_estoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.model.Movimentacao;
import com.Leandro.ferramenta_estoque.model.TipoMovimentacao;

import java.time.LocalDateTime;
import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    List<Movimentacao> findByTipoMovimentacao(TipoMovimentacao tipoMovimentacao);
    List<Movimentacao> findByItem(Item item);
    List<Movimentacao> findByItemOrderByDataDesc(Item item);
    List<Movimentacao> findByItemAndTipoMovimentacao(Item item, TipoMovimentacao tipo);
    List<Movimentacao> findByDataBetween(LocalDateTime inicio, LocalDateTime fim);
}
