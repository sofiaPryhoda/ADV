package com.company.service.impl;

import com.company.dao.UserDAO;
import com.company.dto.UserDTO;
import com.company.mappers.UserMapper;
import com.company.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Transactional
    @Override
    public UserDTO create(UserDTO userDTO) {
        return UserMapper.INSTANCE.toDTO(userDAO.create(UserMapper.INSTANCE.toEntity(userDTO)));
    }

    @Override
    public List<UserDTO> read() {

        return userDAO.read().stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public UserDTO update(UserDTO userDTO) {
        return UserMapper.INSTANCE.toDTO(userDAO.update(UserMapper.INSTANCE.toEntity(userDTO)));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userDAO.delete(id);
    }

    @Override
    public UserDTO getById(Long id) {
        return UserMapper.INSTANCE.toDTO(userDAO.getById(id));
    }

    @Override
    public List<UserDTO> sortByNameASC() {
        return userDAO.sortByNameASC().stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> sortByNameDESK() {
        return userDAO.sortByNameDESK().stream().map(UserMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }
}
