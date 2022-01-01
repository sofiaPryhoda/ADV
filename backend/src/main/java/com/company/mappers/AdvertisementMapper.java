package com.company.mappers;

import com.company.dto.AdvertisementDTO;
import com.company.entity.Advertisement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface AdvertisementMapper {
    AdvertisementMapper INSTANCE = Mappers.getMapper(AdvertisementMapper.class);

    AdvertisementDTO toDTO(Advertisement advertisement);

    Advertisement toEntity(AdvertisementDTO advertisementDTO);
}
