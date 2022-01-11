package com.company.service;

import com.company.dto.AdvertisementDTO;
import com.company.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
//        AbstractService<CategoryDTO> {

    CategoryDTO create(CategoryDTO entity);

    List<CategoryDTO> read();

    CategoryDTO update(CategoryDTO entity);

    CategoryDTO getById(Long id);

    void deleteById(long id);

}
