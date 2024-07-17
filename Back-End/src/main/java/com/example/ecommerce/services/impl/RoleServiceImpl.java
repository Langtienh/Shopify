package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.repositories.RoleRepository;
import com.example.ecommerce.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id = " + id));
    }
}
