package com.company.dao;

import java.util.List;

public interface GenericDAO<T> {
    T create(T entity);

    List<T> read();

    T update(T entity);

    void delete(Long id);

    T getById(Long id);
}
