package com.ensolvers.notes_app_backend.service;

import com.ensolvers.notes_app_backend.application.dto.CategoryRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getAllCategories();
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO);
}
