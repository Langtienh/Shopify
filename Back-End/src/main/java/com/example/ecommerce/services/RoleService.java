package com.example.ecommerce.services;

import com.example.ecommerce.dtos.RoleDTO;
import com.example.ecommerce.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleById(long id);
    Role createRole(RoleDTO roleDTO);
    void deleteRole(long id);
}
