package com.Leandro.ferramenta_estoque.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Leandro.ferramenta_estoque.model.Item;

public interface ItemRepository extends JpaRepository <Item, Long> {
    List<Item> findByCategoria(String categoria);
    Optional<Item> findByNome(String nome);
    List<Item> findByAtivoTrue();
}