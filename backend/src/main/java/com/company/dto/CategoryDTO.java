package com.company.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long id;

    private String name;

    List<AdvertisementWithoutCat> withoutCatList;
}
