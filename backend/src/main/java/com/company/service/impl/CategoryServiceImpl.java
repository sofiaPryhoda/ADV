package com.company.service.impl;

import com.company.dao.CategoryDAO;
import com.company.dto.CategoryDTO;
import com.company.mappers.CategoryMapper;
import com.company.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryDAO categoryDAO;

    @Autowired
    public CategoryServiceImpl(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @Override
    @Transactional
    public CategoryDTO create(CategoryDTO categoryDto) {
        return CategoryMapper.INSTANCE.toDTO(categoryDAO.create(CategoryMapper.INSTANCE.toEntity(categoryDto)));
    }

    @Override
    public List<CategoryDTO> read() {
        return categoryDAO.read().stream().map(CategoryMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public CategoryDTO update(CategoryDTO categoryDto) {
        return CategoryMapper.INSTANCE.toDTO(categoryDAO.update(CategoryMapper.INSTANCE.toEntity(categoryDto)));
    }

    @Override
    public void delete(Long id) {
        categoryDAO.delete(id);
    }

    @Override
    public CategoryDTO getById(Long id) {
        return CategoryMapper.INSTANCE.toDTO(categoryDAO.getById(id));
    }
}