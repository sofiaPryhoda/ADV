package com.company.dao.impl;

import com.company.dao.UserDAO;
import com.company.entity.User;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAOImpl extends GenericDaoImpl<User> implements UserDAO {
    public UserDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    @Override
    public List<User> sortByNameASC() {
        List usersByNameASC = getSession().createCriteria(User.class).addOrder(Order.asc("name")).list();
        return usersByNameASC;
    }

    @Override
    public List<User> sortByNameDESK() {
        List usersByNameASC = getSession().createCriteria(User.class).addOrder(Order.desc("name")).list();
        return usersByNameASC;
    }
}
//query
