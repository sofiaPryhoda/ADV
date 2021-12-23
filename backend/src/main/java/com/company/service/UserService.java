package com.company.service;

import com.company.dto.UserDTO;

import java.util.List;

public interface UserService extends AbstractService<UserDTO> {
    List<UserDTO> sortByNameASC();

    List<UserDTO> sortByNameDESK();
}
