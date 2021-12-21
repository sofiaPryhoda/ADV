package com.company.dao.impl;

import com.company.dao.AdvertisementDAO;
import com.company.entity.Advertisement;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AdvertisementDAOImpl extends GenericDaoImpl<Advertisement> implements AdvertisementDAO {
    public AdvertisementDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

}
