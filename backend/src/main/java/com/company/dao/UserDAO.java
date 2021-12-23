package com.company.dao;

import com.company.entity.User;

import java.util.List;

public interface UserDAO extends GenericDAO<User> {
    List<User> sortByNameASC();
    List<User> sortByNameDESK();
}
