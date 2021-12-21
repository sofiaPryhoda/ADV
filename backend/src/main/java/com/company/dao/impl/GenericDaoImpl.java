package com.company.dao.impl;

import com.company.dao.GenericDAO;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.lang.reflect.ParameterizedType;
import java.util.List;

@Repository
public abstract class GenericDaoImpl<T> implements GenericDAO<T> {

    private final Class<T> entityClass;

    private final SessionFactory sessionFactory;

    @SuppressWarnings("unchecked")
    public GenericDaoImpl(SessionFactory sessionFactory) {
        this.entityClass = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        this.sessionFactory = sessionFactory;
    }

    protected Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public List<T> read() {
        return getSession().createQuery("from " + entityClass.getName(), entityClass).list();
    }

    @Override
    public T create(T entity) {
        getSession().save(entity);
        return entity;
    }

    @Override
    public T getById(Long id) {
        return getSession().get(this.entityClass, id);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(id);
    }

    @Override
    public T update(T entity) {
        getSession().update(entity);
        return entity;
    }
}
