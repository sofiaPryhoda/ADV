package com.company.dao.impl;

import com.company.dao.CategoryDAO;
import com.company.entity.Category;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryDAOImpl extends GenericDaoImpl<Category> implements CategoryDAO {
    public CategoryDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }
}
