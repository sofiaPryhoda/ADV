package com.company.service;

import com.company.dto.AdvWithoutCategoryDTO;
import com.company.dto.AdvertisementDTO;

import java.util.List;

public interface AdvertisementService {
    AdvertisementDTO create(AdvertisementDTO entity);

    List<AdvertisementDTO> read();

    List<AdvWithoutCategoryDTO> read2();

    AdvertisementDTO update(AdvertisementDTO entity);

    AdvertisementDTO getById(Long id);

    void deleteById(long id);
}
