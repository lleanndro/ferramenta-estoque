package com.Leandro.ferramenta_estoque.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Leandro.ferramenta_estoque.model.Item;
import com.Leandro.ferramenta_estoque.repository.ItemRepository;
import com.Leandro.ferramenta_estoque.exception.DuplicidadeNomeException;
import com.Leandro.ferramenta_estoque.exception.IdNaoEncontradoException;
import com.Leandro.ferramenta_estoque.exception.NomeNaoEncontradoException;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item cadastrarItem(Item item) {
        boolean nomeDuplicidade = repository.findByNome(item.getNome()).isPresent();
        if (nomeDuplicidade) {
            throw new DuplicidadeNomeException(item.getNome());
        }

        item.setQuantidade(0.0);
        item.setAtivo(false);

        return repository.save(item);
    }

    public List<Item> listarTodosOsItens() {
        return repository.findAll();
    }

    public List<Item> listarItensEstoque(){
        return repository.findByAtivoTrue();
    }

    public Item buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new IdNaoEncontradoException(id));
    }

    public Item buscarPorNome(String nome){
        return repository.findByNome(nome).orElseThrow(()-> new NomeNaoEncontradoException(nome));
    }

    public void deletarItem(Long id){
        if(!repository.findById(id).isPresent()){
            throw new IdNaoEncontradoException(id);
        }
        repository.deleteById(id);
    }

}