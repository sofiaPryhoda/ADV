package com.company.dao;

import java.util.List;

public interface GenericDAO<T> {
    T create(T entity);

    List<T> read();

    T update(T entity);

    T getById(Long id);

    void delete(T entity);

    void deleteById(long id);
}
