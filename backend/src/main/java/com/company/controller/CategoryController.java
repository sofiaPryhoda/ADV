package com.company.controller;

import com.company.dto.CategoryDTO;
import com.company.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/categories", "/"})
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public List<CategoryDTO> all() {
        return categoryService.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> add(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(categoryService.create(categoryDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody CategoryDTO categoryDTO) {
        categoryService.update(categoryDTO);
        return ResponseEntity.ok().body("Category was updated successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok().body("Category was deleted successfully");
    }
}