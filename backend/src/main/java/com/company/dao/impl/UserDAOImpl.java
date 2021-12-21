package com.company.dao.impl;

import com.company.dao.UserDAO;
import com.company.entity.User;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImpl extends GenericDaoImpl<User> implements UserDAO {
    public UserDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

}


