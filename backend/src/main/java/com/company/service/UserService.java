package com.company.service;

import com.company.dto.CategoryDTO;
import com.company.dto.UserDTO;

import java.util.List;

public interface UserService {
    //        extends AbstractService<UserDTO> {
    UserDTO create(UserDTO entity);

    List<UserDTO> read();

    UserDTO update(UserDTO entity);

    UserDTO getById(Long id);

    void deleteById(long id);
}
