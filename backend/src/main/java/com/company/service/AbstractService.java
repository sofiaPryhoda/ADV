package com.company.service;

import java.util.List;

public interface AbstractService<T>{
    T create(T entity);

    List<T> read();

    T update(T entity);

    void delete(Long id);

    T getById(Long id);
}
