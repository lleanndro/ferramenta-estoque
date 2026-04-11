package com.Leandro.ferramenta_estoque.controller;

import java.util.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Leandro.ferramenta_estoque.service.ItemService;

import jakarta.validation.Valid;

import com.Leandro.ferramenta_estoque.model.Item;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/itens")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping // /itens já está implicito. 
    public ResponseEntity<List<Item>> listarTodosItens(){
       List<Item> listaDeItens = itemService.listarTodosOsItens();
       return ResponseEntity.ok(listaDeItens);
    }

    @GetMapping ("/ativo")
    public ResponseEntity<List<Item>> listarItensNoEstoque(){
        List<Item> listaDeItensEstoque = itemService.listarItensEstoque();
        return ResponseEntity.ok(listaDeItensEstoque);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> buscarPorId( @PathVariable Long id){
        Item itemBuscado = itemService.buscarPorId(id);
        return ResponseEntity.ok(itemBuscado);
    }
    
    @GetMapping("/buscar/{nome}")
    public ResponseEntity<Item> buscarPorNome(@PathVariable String nome){
        Item itemBuscado = itemService.buscarPorNome(nome);
        return ResponseEntity.ok(itemBuscado);
    }

    @PostMapping
    public ResponseEntity<Item> cadastrarItem(@Valid @RequestBody Item item){
        Item itemCadastrado = itemService.cadastrarItem(item);
        return ResponseEntity.status(201).body(itemCadastrado);
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable Long id){
        itemService.deletarItem(id);
        return ResponseEntity.noContent().build();
    }
    
}