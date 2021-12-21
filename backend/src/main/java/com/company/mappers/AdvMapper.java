package com.company.mappers;

import com.company.dto.AdvertisementWithoutCat;
import com.company.entity.Advertisement;
import org.mapstruct.factory.Mappers;

public interface AdvMapper {
    AdvMapper INSTANCE = Mappers.getMapper(AdvMapper.class);

    AdvertisementWithoutCat toDTO(Advertisement advertisement);

    Advertisement toEntity(AdvertisementWithoutCat advertisementWithoutCat);
}
