package com.company.service.impl;

import com.company.dao.AdvertisementDAO;
import com.company.dto.AdvWithoutCategoryDTO;
import com.company.dto.AdvertisementDTO;
import com.company.dto.CategoryDTO;
import com.company.mappers.AdvWithoutCategoryMapper;
import com.company.mappers.CategoryMapper;
import obsolete.AdvertisementDTO2;
import com.company.mappers.AdvertisementMapper;
import com.company.service.AdvertisementService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AdvertisementServiceImpl implements AdvertisementService {

    AdvertisementDAO advertisementDAO;

    public AdvertisementServiceImpl(AdvertisementDAO advertisementDAO) {
        this.advertisementDAO = advertisementDAO;
    }

    @Transactional
    @Override
    public AdvertisementDTO create(AdvertisementDTO advertisementDTO) {
        return AdvertisementMapper.INSTANCE.toDTO(advertisementDAO.create(AdvertisementMapper.INSTANCE.toEntity(advertisementDTO)));
    }

    @Override
    public List<AdvertisementDTO> read() {
        return advertisementDAO.read().stream().map(AdvertisementMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<AdvWithoutCategoryDTO> read2() {
        return advertisementDAO.read().stream().map(AdvWithoutCategoryMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public AdvertisementDTO update(AdvertisementDTO advertisementDTO) {
        return AdvertisementMapper.INSTANCE.toDTO(advertisementDAO.update(AdvertisementMapper.INSTANCE.toEntity(advertisementDTO)));
    }

    @Override
    public AdvertisementDTO getById(Long id) {
        return AdvertisementMapper.INSTANCE.toDTO(advertisementDAO.getById(id));
    }

    @Transactional
    @Override
    public void deleteById(long id) {
        advertisementDAO.deleteById(id);
    }
}
