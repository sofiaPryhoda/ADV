package com.company.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdvertisementDTO {
    private long id;

    private String name;

    private String description;

    private UserDTO user;

    private CategoryDTO category;
}
