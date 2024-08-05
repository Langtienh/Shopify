package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.RoleDTO;
import com.example.ecommerce.exceptions.InvalidParamException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.repositories.RoleRepository;
import com.example.ecommerce.repositories.UserRoleRepository;
import com.example.ecommerce.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id = " + id));
    }

    @Override
    @Transactional
    public Role createRole(RoleDTO roleDTO) {
        Role role = new Role();
        role.setName(roleDTO.getName());
        roleRepository.save(role);
        return role;
    }

    @Override
    @Transactional
    public void deleteRole(long id) {
        Role role = getRoleById(id);
        if(userRoleRepository.existsByRole(role))
            throw new InvalidParamException("Không thể xóa role đã liên kết với user");
        roleRepository.delete(role);
    }
}
