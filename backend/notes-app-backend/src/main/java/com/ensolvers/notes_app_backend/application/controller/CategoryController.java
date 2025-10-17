package com.ensolvers.notes_app_backend.application.controller;

import com.ensolvers.notes_app_backend.application.dto.CategoryRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.CategoryResponseDTO;
import com.ensolvers.notes_app_backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public CategoryResponseDTO createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        return categoryService.createCategory(categoryRequestDTO);
    }
}
