package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CategoryDTO;
import com.example.ecommerce.models.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryDTO categoryDTO);
    Category getCategoryById(long id);
    List<Category> getAllCategories();
    Category updateCategory(long id, CategoryDTO categoryDTO);
}
