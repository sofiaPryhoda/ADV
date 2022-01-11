package com.company.mappers;

import com.company.dto.AdvWithoutCategoryDTO;
import com.company.entity.Advertisement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AdvWithoutCategoryMapper {
    AdvWithoutCategoryMapper INSTANCE = Mappers.getMapper(AdvWithoutCategoryMapper.class);

    AdvWithoutCategoryDTO toDTO(Advertisement advertisement);

    Advertisement toEntity(AdvWithoutCategoryDTO advWithoutCategoryDTO);
}
