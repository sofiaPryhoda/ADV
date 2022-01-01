package com.company.service.impl;

import com.company.dao.AdvertisementDAO;
import com.company.dto.AdvertisementDTO;
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
    @Transactional
    @Override
    public AdvertisementDTO update(AdvertisementDTO advertisementDTO2) {
        return null;
//                AdvertisementMapper.INSTANCE.toDTO(advertisementDAO.update(AdvertisementMapper.INSTANCE.toEntity(advertisementDTO2)));
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
