package com.company.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private long id;

    private String name;

    private List<AdvWithoutCategoryDTO> advertisements;
}
