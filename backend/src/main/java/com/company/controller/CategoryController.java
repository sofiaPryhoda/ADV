package com.company.controller;

import com.company.dto.CategoryDTO;
import com.company.dto.UserDTO;
import com.company.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/adv", "/"})
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    //        @GetMapping("/all")
//    @CrossOrigin
    @GetMapping("/categories")
    public List<CategoryDTO> all() {
        return categoryService.read();
    }

    //        @CrossOrigin
    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    //    @CrossOrigin
    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> add(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(categoryService.create(categoryDTO));
    }

//    @CrossOrigin
//    @PutMapping("/categories")
//    public ResponseEntity<String> update(@RequestBody CategoryDTO categoryDTO) {
//        categoryService.update(categoryDTO);
//        return ResponseEntity.ok().body("Category was updated successfully");
//    }
    @CrossOrigin
    @PutMapping("/categories/{id}")
    public CategoryDTO update(@PathVariable("id") Long id, @RequestBody CategoryDTO categoryDTO) {
        categoryDTO.setId(id);
        return categoryService.update(categoryDTO);
    }

    //    @CrossOrigin
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        categoryService.deleteById(id);
        return ResponseEntity.ok().body("Category was deleted successfully");
    }
}