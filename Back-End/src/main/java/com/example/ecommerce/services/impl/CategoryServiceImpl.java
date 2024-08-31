package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.CategoryDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.repositories.CategoryRepository;
import com.example.ecommerce.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    @Transactional
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = Category
                .builder()
                .name(categoryDTO.getName())
                .label(categoryDTO.getLabel())
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Category not found with id = " + id));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public Category updateCategory(long id, CategoryDTO categoryDTO) {
        Category category = getCategoryById(id);
        category.setName(categoryDTO.getName());
        category.setLabel(categoryDTO.getLabel());
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteCategory(long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}
