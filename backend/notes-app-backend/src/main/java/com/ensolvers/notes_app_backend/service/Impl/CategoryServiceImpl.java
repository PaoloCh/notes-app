package com.ensolvers.notes_app_backend.service.Impl;

import com.ensolvers.notes_app_backend.application.dto.CategoryRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.CategoryResponseDTO;
import com.ensolvers.notes_app_backend.domain.model.Category;
import com.ensolvers.notes_app_backend.domain.repository.CategoryRepository;
import com.ensolvers.notes_app_backend.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        Category savedCategory = categoryRepository.save(category);
        return mapToDTO(savedCategory);
    }

    private CategoryResponseDTO mapToDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}
